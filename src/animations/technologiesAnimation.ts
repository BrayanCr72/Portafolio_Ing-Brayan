import { gsap, ScrollTrigger, registerGsap } from './gsap';
import { getActiveContainer, prefersReducedMotion } from './utils';

const tiltCleanups: Array<() => void> = [];

export function initTechnologiesAnimations(): void {
  registerGsap();
  const container = getActiveContainer();
  if (!container) return;

  const section = container.querySelector('#technologies') as HTMLElement;
  if (!section) return;

  // Cleanup tilts anteriores
  tiltCleanups.forEach(c => c());
  tiltCleanups.length = 0;

  // ── Header ──
  const header = section.querySelector('#tech-header');
  if (header) {
    gsap.from(header, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
  }

  // ── Categorías y sus items ──
  const categories = section.querySelectorAll('[id^="tech-category-"]');
  categories.forEach((cat) => {
    const title = cat.querySelector('h3');
    const cards = cat.querySelectorAll('.tech-card');

    if (title) {
      gsap.from(title, {
        x: -50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    }

    if (cards.length) {
      gsap.from(cards, {
        y: 60, opacity: 0, scale: 0.85,
        duration: 0.7, ease: 'back.out(1.4)',
        stagger: { amount: 0.6, from: 'start' },
        scrollTrigger: { trigger: cat, start: 'top 75%', toggleActions: 'play none none reverse' }
      });
    }

    // Tilt 3D solo en desktop y sin reduced motion
    if (!prefersReducedMotion() && window.matchMedia('(min-width: 1024px)').matches) {
      cards.forEach((card) => {
        const cleanup = attachTilt(card as HTMLElement);
        tiltCleanups.push(cleanup);
      });
    }
  });

  // ── Parallax orbs del fondo ──
  if (!prefersReducedMotion()) {
    const orbs = section.querySelectorAll('.absolute.rounded-full.blur-3xl');
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        yPercent: i % 2 === 0 ? -40 : 40,
        ease: 'none',
        scrollTrigger: {
          trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1,
        }
      });
    });
  }
}

function attachTilt(card: HTMLElement): () => void {
  const max = 12; // grados de inclinación
  const rotX = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power3.out' });
  const rotY = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power3.out' });
  const scale = gsap.quickTo(card, 'scale', { duration: 0.4, ease: 'power3.out' });

  gsap.set(card, { transformPerspective: 800, transformStyle: 'preserve-3d' });

  const onMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotY(x * max);
    rotX(-y * max);
    scale(1.04);
  };

  const onLeave = () => {
    rotX(0); rotY(0); scale(1);
  };

  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);

  return () => {
    card.removeEventListener('mousemove', onMove);
    card.removeEventListener('mouseleave', onLeave);
  };
}
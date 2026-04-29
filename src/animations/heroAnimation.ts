import { gsap, registerGsap } from './gsap';
import SplitType from 'split-type';
import { prefersReducedMotion } from './utils';

let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

export function setHeroInitialState(): void {
  registerGsap();
  gsap.set('#hero-image-container', { scale: 0.8, opacity: 0 });
  gsap.set(['#hero-title', '#hero-tagline'], { y: 30, opacity: 0 });
  gsap.set('#hero-content-text', { y: 40, opacity: 0 });
  gsap.set('#hero-bg-overlay', { opacity: 0 });
  gsap.set('#hero-header', { opacity: 1 }); // ya no fade del header completo
}

export function animateHero(): void {
  registerGsap();
  const reduced = prefersReducedMotion();

  // ── Split del nombre ──
  const nameEl = document.querySelector('#hero-name') as HTMLElement;
  let split: SplitType | null = null;
  if (nameEl && !reduced) {
    split = new SplitType(nameEl, { types: 'chars,words' });
    gsap.set(split.chars, { y: 80, opacity: 0, rotateX: -90, transformOrigin: '50% 100%' });
    gsap.set(nameEl, { opacity: 1, perspective: 600 });
  } else if (nameEl) {
    gsap.set(nameEl, { opacity: 1 });
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#hero-bg-overlay', { opacity: 1, duration: 1.2 })

    .to('#hero-image-container', {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'back.out(1.4)',
    }, '-=0.7');

  if (split && split.chars) {
    tl.to(split.chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.025,
      ease: 'back.out(1.7)',
    }, '-=0.5');
  }

  tl.to('#hero-title', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#hero-tagline', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#hero-content-text', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .to('#hero-scroll-indicator', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

  // ── Parallax con mouse (solo desktop, no reduced) ──
  initHeroMouseParallax();

  // ── Blobs flotantes con scroll ──
  initHeroBlobsParallax();

  // ── Scroll indicator loop ──
  initScrollIndicatorLoop();
}

function initHeroMouseParallax(): void {
  if (prefersReducedMotion()) return;
  if (window.matchMedia('(max-width: 1023px)').matches) return;

  const hero = document.getElementById('hero');
  const image = document.getElementById('hero-image-container');
  const blob1 = document.querySelector('[data-blob="1"]');
  const blob2 = document.querySelector('[data-blob="2"]');
  const blob3 = document.querySelector('[data-blob="3"]');
  if (!hero || !image) return;

  // Quitar listener anterior si existe
  if (mouseMoveHandler) {
    window.removeEventListener('mousemove', mouseMoveHandler);
  }

  const xTo = gsap.quickTo(image, 'x', { duration: 0.8, ease: 'power3.out' });
  const yTo = gsap.quickTo(image, 'y', { duration: 0.8, ease: 'power3.out' });

  const blob1X = blob1 ? gsap.quickTo(blob1, 'x', { duration: 1.5, ease: 'power3.out' }) : null;
  const blob1Y = blob1 ? gsap.quickTo(blob1, 'y', { duration: 1.5, ease: 'power3.out' }) : null;
  const blob2X = blob2 ? gsap.quickTo(blob2, 'x', { duration: 1.8, ease: 'power3.out' }) : null;
  const blob2Y = blob2 ? gsap.quickTo(blob2, 'y', { duration: 1.8, ease: 'power3.out' }) : null;
  const blob3X = blob3 ? gsap.quickTo(blob3, 'x', { duration: 2.0, ease: 'power3.out' }) : null;
  const blob3Y = blob3 ? gsap.quickTo(blob3, 'y', { duration: 2.0, ease: 'power3.out' }) : null;

  mouseMoveHandler = (e: MouseEvent) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    xTo(x * 30);
    yTo(y * 30);

    blob1X?.(x * -50);  blob1Y?.(y * -50);
    blob2X?.(x * 60);   blob2Y?.(y * 60);
    blob3X?.(x * -40);  blob3Y?.(y * 40);
  };

  window.addEventListener('mousemove', mouseMoveHandler);
}

function initHeroBlobsParallax(): void {
  if (prefersReducedMotion()) return;
  // El parallax con scroll lo manejaremos con ScrollTrigger en otro archivo
  // si lo querés. Por ahora: animación flotante CSS-driven funciona perfecto.
}

function initScrollIndicatorLoop(): void {
  const indicator = document.querySelector('#hero-scroll-indicator [data-arrow]');
  if (!indicator) return;
  gsap.to(indicator, {
    y: 8,
    duration: 1.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
}
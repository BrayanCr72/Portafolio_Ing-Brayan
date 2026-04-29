import { gsap, ScrollTrigger, registerGsap } from './gsap';
import { getActiveContainer, prefersReducedMotion } from './utils';

export function initExperienceAnimation(): void {
  registerGsap();

  const container = getActiveContainer();
  if (!container) return;

  const section = container.querySelector('#experience') as HTMLElement;
  if (!section) return;

  const track = section.querySelector('[data-experience-track]') as HTMLElement;
  const panels = gsap.utils.toArray<HTMLElement>('[data-experience-panel]', section);
  const progressBar = section.querySelector('[data-experience-progress]') as HTMLElement;
  if (!track || !panels.length) return;

  const reduced = prefersReducedMotion();
  const mm = gsap.matchMedia();

  // ─────── DESKTOP: scroll horizontal pinned ───────
  mm.add('(min-width: 1024px)', () => {
    const getDistance = () => track.scrollWidth - window.innerWidth;

    const horizontal = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: reduced ? false : 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        // Barra de progreso
        onUpdate: (self) => {
          if (progressBar) {
            progressBar.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    // Animar contenido de cada panel cuando entra
    panels.forEach((panel) => {
      const header = panel.querySelector('[data-panel-header]');
      const cards = panel.querySelectorAll('[data-project-card]');
      const bigNumber = panel.querySelector('[data-panel-number]');

      if (header) {
        gsap.from(header, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontal,
            start: 'left 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (bigNumber) {
        gsap.from(bigNumber, {
          xPercent: -30,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontal,
            start: 'left 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (cards.length) {
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontal,
            start: 'left 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    return () => {
      // matchMedia limpia automáticamente al cambiar viewport
    };
  });

  // ─────── MOBILE / TABLET: stagger vertical ───────
  mm.add('(max-width: 1023px)', () => {
    panels.forEach((panel) => {
      const header = panel.querySelector('[data-panel-header]');
      const cards = panel.querySelectorAll('[data-project-card]');

      if (header) {
        gsap.from(header, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (cards.length) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });
  });
}
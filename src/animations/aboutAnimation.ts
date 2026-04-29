import { gsap, ScrollTrigger, registerGsap } from './gsap';
import { getActiveContainer, prefersReducedMotion } from './utils';

export function initAboutAnimations(): void {
  registerGsap();
  const container = getActiveContainer();
  if (!container) return;

  const about = container.querySelector('#about') as HTMLElement;
  if (!about) return;

  const reduced = prefersReducedMotion();

  // ── Header con clip-path reveal ──
  const header = about.querySelector('#about-header') as HTMLElement;
  if (header) {
    gsap.set(header, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
    });
    ScrollTrigger.create({
      trigger: header,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(header, {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        });
      },
    });
  }

  // ── Bloques con reveal lateral ──
  const blocks = [
    { selector: '#about-intro',      x: -80 },
    { selector: '#about-journey',    x: -80 },
    { selector: '#about-experience', x:  80 },
    { selector: '#about-workstyle',  y:  60 },
    { selector: '#about-goals',      y:  60 },
    { selector: '#about-personal',   y:  60 },
  ];

  blocks.forEach(({ selector, x = 0, y = 0 }) => {
    const el = about.querySelector(selector) as HTMLElement;
    if (!el) return;

    gsap.set(el, { x, y, opacity: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, {
          x: 0, y: 0, opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
        });
      },
      onLeaveBack: () => {
        if (reduced) return;
        gsap.to(el, { x, y, opacity: 0, duration: 0.4, ease: 'power2.in' });
      },
    });
  });

  // ── Parallax sutil en los bloques de blur del fondo ──
  if (!reduced && !window.matchMedia('(max-width: 767px)').matches) {
    const bgOrbs = about.querySelectorAll('.absolute.rounded-full.blur-3xl');
    bgOrbs.forEach((orb, i) => {
      gsap.to(orb, {
        yPercent: i % 2 === 0 ? -30 : 30,
        ease: 'none',
        scrollTrigger: {
          trigger: about,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }
}
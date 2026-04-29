import { gsap, ScrollTrigger, registerGsap } from './gsap';
import { getActiveContainer, prefersReducedMotion } from './utils';

export function initHeroToAboutTransition(): void {
  registerGsap();

  // Si el usuario prefiere reduced motion, no hacemos pin
  if (prefersReducedMotion()) return;
  if (window.matchMedia('(max-width: 767px)').matches) return; // sin pin en mobile

  const container = getActiveContainer();
  if (!container) return;

  const hero = container.querySelector('#hero') as HTMLElement;
  if (!hero) return;

  // Fade-out sutil del hero al hacer scroll (sin pin agresivo)
  gsap.to(hero, {
    opacity: 0.3,
    scale: 0.95,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
}
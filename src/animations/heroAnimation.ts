import { gsap } from 'gsap';

export function setHeroInitialState(): void {
  gsap.set('#hero-image-container', { scale: 0.8 });
  gsap.set(['#hero-name', '#hero-title', '#hero-tagline'], { y: 30 });
  gsap.set('#hero-content-text', { y: 40 });
}

export function animateHero(): void {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#hero-bg-overlay', { opacity: 0.2, duration: 1 })

    .to('#hero-image-container', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, '-=0.5')

    .to('#hero-header', { opacity: 1, duration: 0.5 }, '-=0.4')

    .to('#hero-name', {
      opacity: 1,
      y: 0,
      duration: 0.7,
    }, '-=0.3')

    .to('#hero-title', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.4')

    .to('#hero-tagline', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.4')

    .to('#hero-content-text', {
      opacity: 1,
      y: 0,
      duration: 0.7,
    }, '-=0.3');
}
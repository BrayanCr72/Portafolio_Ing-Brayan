import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroToAboutTransition(): void {
  ScrollTrigger.getAll().forEach(t => t.kill());

  const lang = localStorage.getItem('lang') || 'es';
  const container = document.getElementById(`content-${lang}`);
  if (!container) return;

  const hero = container.querySelector('#hero') as HTMLElement;
  const about = container.querySelector('#about') as HTMLElement;
  if (!hero || !about) return;

  gsap.set([hero, about], { clearProps: 'all' });

  // Hero encima del about, se desliza a la izquierda
  // mientras el about ya está visible debajo
  hero.style.position = 'relative';
  hero.style.zIndex = '10';

  about.style.position = 'relative';
  about.style.zIndex = '1';

  // El hero se pega al top mientras scrolleas
  // y se va desplazando a la izquierda
  gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'bottom bottom',       // se pega cuando llega al top
      end: '+=100%',          // dura un 100vh de scroll
      pin: true,              // fija el hero
      pinSpacing: false,      // NO agrega espacio extra — el about sube por debajo
      scrub: 1,
    }
  })
  .to(hero, {
    x: '-100%',
    opacity: 0.3,
    ease: 'none',
  });
}

export function initAboutContentAnimations(): void {
  const lang = localStorage.getItem('lang') || 'es';
  const container = document.getElementById(`content-${lang}`);
  if (!container) return;

  const about = container.querySelector('#about') as HTMLElement;
  if (!about) return;

  const elements = [
    { selector: '#about-header',     from: { y: -50, opacity: 0 } },
    { selector: '#about-intro',      from: { x: -80, opacity: 0 } },
    { selector: '#about-journey',    from: { x: -80, opacity: 0 } },
    { selector: '#about-experience', from: { x: 80,  opacity: 0 } },
    { selector: '#about-workstyle',  from: { y: 50,  opacity: 0 } },
    { selector: '#about-goals',      from: { y: 50,  opacity: 0 } },
    { selector: '#about-personal',   from: { y: 50,  opacity: 0 } },
  ];

  elements.forEach(({ selector, from }) => {
    const el = about.querySelector(selector) as HTMLElement;
    if (!el) return;

    gsap.set(el, { ...from });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      },
      onEnterBack: () => {
        gsap.to(el, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      },
      onLeaveBack: () => {
        gsap.to(el, { ...from, duration: 0.4, ease: 'power2.in' });
      },
    });
  });
}
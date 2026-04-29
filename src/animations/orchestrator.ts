import { registerGsap, ScrollTrigger } from './gsap';
import { setHeroInitialState, animateHero } from './heroAnimation';
import { initHeroToAboutTransition } from './transitionAnimation';
import { initAboutAnimations } from './aboutAnimation';
import { initTechnologiesAnimations } from './technologiesAnimation';
import { initExperienceAnimation } from './experienceAnimation';
import { initContactAnimations } from './contactAnimation';
import { initNavbarAnimations } from './navbarAnimation';
import { killAllScrollTriggers } from './utils';

export function initAllAnimations(): void {
  registerGsap();
  killAllScrollTriggers();

  setHeroInitialState();
  animateHero();
  initNavbarAnimations();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initHeroToAboutTransition();
      initAboutAnimations();
      initTechnologiesAnimations();
      initExperienceAnimation();
      initContactAnimations();

      ScrollTrigger.refresh();
    });
  });
}

export function reinitOnLangChange(): void {
  killAllScrollTriggers();
  setTimeout(() => initAllAnimations(), 50);
}
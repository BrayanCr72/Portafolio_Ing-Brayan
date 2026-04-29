import Lenis from 'lenis';
import { gsap, ScrollTrigger, registerGsap } from '../animations/gsap';

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance;
  registerGsap();

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  // Sincronizar Lenis con ScrollTrigger (CRÍTICO)
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance!.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTarget(
  target: string | HTMLElement,
  offset = -80 // compensa el navbar fijo
): void {
  if (!lenisInstance) {
    // Fallback si Lenis aún no inicializó
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  lenisInstance.scrollTo(target, { offset, duration: 1.5 });
}

export function destroyLenis(): void {
  lenisInstance?.destroy();
  lenisInstance = null;
}
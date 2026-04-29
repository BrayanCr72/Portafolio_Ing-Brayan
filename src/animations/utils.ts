import { ScrollTrigger } from './gsap';

export function getActiveContainer(): HTMLElement | null {
  const lang = localStorage.getItem('lang') || 'es';
  return document.getElementById(`content-${lang}`);
}

export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
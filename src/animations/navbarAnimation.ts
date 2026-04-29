import { gsap, ScrollTrigger, registerGsap } from './gsap';
import { prefersReducedMotion } from './utils';

export function initNavbarAnimations(): void {
  registerGsap();
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // ── Auto-hide al scrollear hacia abajo ──
  if (!prefersReducedMotion()) {
    let lastScroll = 0;
    const showNav = gsap.quickTo(navbar, 'y', { duration: 0.4, ease: 'power3.out' });

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const current = self.scroll();
        if (current < 100) {
          showNav(0);
          lastScroll = current;
          return;
        }
        if (current > lastScroll && self.direction === 1) {
          showNav(-100); // ocultar
        } else if (self.direction === -1) {
          showNav(0); // mostrar
        }
        lastScroll = current;
      }
    });
  }

  // ── Scroll progress bar ──
  let progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    progressBar.className = 'fixed top-0 left-0 h-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 z-[60] origin-left';
    progressBar.style.width = '100%';
    progressBar.style.transform = 'scaleX(0)';
    document.body.appendChild(progressBar);
  }

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      progressBar!.style.transform = `scaleX(${self.progress})`;
    }
  });
}
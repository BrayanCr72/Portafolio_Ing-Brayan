import { gsap, ScrollTrigger, registerGsap } from './gsap';
import { getActiveContainer, prefersReducedMotion } from './utils';

const magneticCleanups: Array<() => void> = [];

export function initContactAnimations(): void {
  registerGsap();
  const container = getActiveContainer();
  if (!container) return;

  const section = container.querySelector('#contact') as HTMLElement;
  if (!section) return;

  magneticCleanups.forEach(c => c());
  magneticCleanups.length = 0;

  const reduced = prefersReducedMotion();

  // ── Header ──
  const header = section.querySelector('#contact-header');
  if (header) {
    gsap.from(header, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
  }

  // ── Form container ──
  const form = section.querySelector('#contact-form-container');
  if (form) {
    gsap.from(form, {
      x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: form, start: 'top 80%', toggleActions: 'play none none reverse' }
    });
  }

  // ── Sidebar info ──
  const info = section.querySelector('#contact-info');
  if (info) {
    gsap.from(info, {
      x: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: info, start: 'top 80%', toggleActions: 'play none none reverse' }
    });
  }

  // ── Form fields stagger ──
  const fields = section.querySelectorAll('[data-gsap^="form-"]');
  if (fields.length) {
    gsap.from(fields, {
      y: 30, opacity: 0, duration: 0.6, ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: form, start: 'top 70%', toggleActions: 'play none none reverse' }
    });
  }

  // ── Magnetic submit button ──
  const submitBtn = section.querySelector('#submit-button') as HTMLElement;
  if (submitBtn && !reduced && window.matchMedia('(min-width: 1024px)').matches) {
    const cleanup = attachMagnetic(submitBtn, 0.4, 80);
    magneticCleanups.push(cleanup);
  }

  // ── Reveal animado de campos company/freelance ──
  setupConditionalFieldsReveal(section);
}

function attachMagnetic(el: HTMLElement, strength = 0.4, radius = 80): () => void {
  const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < radius + Math.max(rect.width, rect.height) / 2) {
      xTo(dx * strength);
      yTo(dy * strength);
    } else {
      xTo(0); yTo(0);
    }
  };

  const onLeave = () => { xTo(0); yTo(0); };

  window.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);

  return () => {
    window.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  };
}

function setupConditionalFieldsReveal(section: HTMLElement): void {
  const select = section.querySelector('#contact-type') as HTMLSelectElement;
  const companyFields = section.querySelector('#company-fields') as HTMLElement;
  const freelanceFields = section.querySelector('#freelance-fields') as HTMLElement;
  if (!select) return;

  const reveal = (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.remove('hidden');
    gsap.fromTo(el,
      { height: 0, opacity: 0 },
      {
        height: 'auto', opacity: 1,
        duration: 0.5, ease: 'power3.out',
        onComplete: () => { el.style.height = ''; }
      }
    );
  };

  const hide = (el: HTMLElement | null) => {
    if (!el || el.classList.contains('hidden')) return;
    gsap.to(el, {
      height: 0, opacity: 0,
      duration: 0.4, ease: 'power3.in',
      onComplete: () => {
        el.classList.add('hidden');
        el.style.height = '';
      }
    });
  };

  select.addEventListener('change', () => {
    const v = select.value;
    if (v === 'company') {
      reveal(companyFields);
      hide(freelanceFields);
    } else if (v === 'freelance') {
      reveal(freelanceFields);
      hide(companyFields);
    } else {
      hide(companyFields);
      hide(freelanceFields);
    }
  });
}
import { gsap } from 'gsap';

function typeWriter(element: HTMLElement, text: string, duration: number): Promise<void> {
  return new Promise((resolve) => {
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, duration / text.length);
  });
}

export async function runLoadingSequence(onComplete: () => void): Promise<void> {
  const lang = localStorage.getItem('lang') || 'es';

  const lines = {
    es: [
      'Iniciando sistema...',
      'Cargando módulos del portafolio...',
      'Compilando experiencia y proyectos...',
      '¡Bienvenido al portafolio de Brayan Ordoñez!',
    ],
    en: [
      'Booting system...',
      'Loading portfolio modules...',
      'Compiling experience and projects...',
      "Welcome to Brayan Ordoñez's portfolio!",
    ],
  };

  const terminalLines = lines[lang as 'es' | 'en'];

  const screen = document.getElementById('loading-screen');
  if (!screen) { onComplete(); return; }

  const line1 = screen.querySelector('[data-line="1"]') as HTMLElement;
  const line2 = screen.querySelector('[data-line="2"]') as HTMLElement;
  const line3 = screen.querySelector('[data-line="3"]') as HTMLElement;
  const line4 = screen.querySelector('[data-line="4"]') as HTMLElement;
  const text1 = screen.querySelector('[data-text="1"]') as HTMLElement;
  const text2 = screen.querySelector('[data-text="2"]') as HTMLElement;
  const text3 = screen.querySelector('[data-text="3"]') as HTMLElement;
  const text4 = screen.querySelector('[data-text="4"]') as HTMLElement;
  const progress = screen.querySelector('[data-progress]') as HTMLElement;

  if (!line1 || !line2 || !line3 || !line4 || !text1 || !text2 || !text3 || !text4) {
    onComplete();
    return;
  }

  // Reset por si acaso
  [line1, line2, line3, line4].forEach(l => gsap.set(l, { opacity: 0 }));
  [text1, text2, text3, text4].forEach(t => t.textContent = '');
  if (progress) gsap.set(progress, { width: '0%' });

  gsap.to(line1, { opacity: 1, duration: 0.3 });
  await typeWriter(text1, terminalLines[0], 600);
  if (progress) gsap.to(progress, { width: '25%', duration: 0.4, ease: 'power2.out' });

  await gsap.to(line2, { opacity: 1, duration: 0.3, delay: 0.2 });
  await typeWriter(text2, terminalLines[1], 800);
  if (progress) gsap.to(progress, { width: '50%', duration: 0.4, ease: 'power2.out' });

  await gsap.to(line3, { opacity: 1, duration: 0.3, delay: 0.2 });
  await typeWriter(text3, terminalLines[2], 800);
  if (progress) gsap.to(progress, { width: '75%', duration: 0.4, ease: 'power2.out' });

  await gsap.to(line4, { opacity: 1, duration: 0.3, delay: 0.2 });
  await typeWriter(text4, terminalLines[3], 1000);
  if (progress) gsap.to(progress, { width: '100%', duration: 0.4, ease: 'power2.out' });

  await new Promise(r => setTimeout(r, 600));

  gsap.to(screen, {
    yPercent: -100,
    duration: 0.8,
    ease: 'power3.inOut',
    onComplete: () => {
      screen.style.display = 'none';
      onComplete();
    },
  });
}
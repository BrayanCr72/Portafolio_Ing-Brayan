export type Language = 'en' | 'es';

export function getLanguageFromUrl(url: URL): Language {
  const lang = url.searchParams.get('lang');
  return lang === 'en' ? 'en' : 'es';
}
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import en from './en';
import gr from './gr';
import { pageFromPath } from '@/lib/siteRoute';

export type Language = 'en' | 'gr';
type Copy = typeof en | typeof gr;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: Copy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const copies: Record<Language, Copy> = { en, gr };

const languageFromPath = (): Language | null => {
  const segments = window.location.pathname.split('/').filter(Boolean);
  for (let index = segments.length - 1; index >= 0; index -= 1) {
    if (segments[index] === 'en' || segments[index] === 'gr') return segments[index] as Language;
  }
  return null;
};

const languagePath = (language: Language) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pageSuffix = pageFromPath() === 'privacy' ? '/privacy/' : '';
  return `${base}/${language}${pageSuffix}${window.location.hash}`;
};

const ensureMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLElement | null;
  if (!element) {
    element = document.createElement(attributes.rel ? 'link' : 'meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, updateLanguage] = useState<Language>(() => languageFromPath() ?? 'en');

  useEffect(() => {
    if (!languageFromPath()) window.history.replaceState(null, '', languagePath('en'));

    const handlePopState = () => updateLanguage(languageFromPath() ?? 'en');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const current = copies[language];
    const page = pageFromPath();
    const meta = page === 'privacy' ? current.privacyPolicy.meta : current.meta;
    const baseUrl = `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}`;
    const pageSuffix = page === 'privacy' ? '/privacy/' : '';
    const canonicalUrl = `${baseUrl}/${language}${pageSuffix}`;

    document.documentElement.lang = language === 'gr' ? 'el' : 'en';
    document.documentElement.classList.toggle('lang-gr', language === 'gr');
    document.title = meta.title;

    ensureMeta('meta[name="description"]', { name: 'description', content: meta.description });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: meta.ogDescription });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title });
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.ogDescription });
    ensureMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
    ensureMeta('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en${pageSuffix}` });
    ensureMeta('link[rel="alternate"][hreflang="el"]', { rel: 'alternate', hreflang: 'el', href: `${baseUrl}/gr${pageSuffix}` });
    ensureMeta('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/en${pageSuffix}` });
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) return;
    window.history.pushState(null, '', languagePath(nextLanguage));
    updateLanguage(nextLanguage);
  };

  const value = { language, setLanguage, copy: copies[language] };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Shared hook intentionally lives beside its provider to keep the language API self-contained.
// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
};

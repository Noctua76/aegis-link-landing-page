export type SitePage = 'landing' | 'privacy';

export const pageFromPath = (): SitePage => {
  const segments = window.location.pathname.split('/').filter(Boolean);
  return segments.includes('privacy') ? 'privacy' : 'landing';
};

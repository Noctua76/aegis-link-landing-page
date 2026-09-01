export type NavigationInfoKey = 'platform' | 'solutions' | 'product' | 'resources';

export const NAVIGATION_INFO_EVENT = 'aegis:open-navigation-info';

export const openNavigationInfoModal = (section: NavigationInfoKey) => {
  window.dispatchEvent(
    new CustomEvent(NAVIGATION_INFO_EVENT, {
      detail: { section },
    }),
  );
};

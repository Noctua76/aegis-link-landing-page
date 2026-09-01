export const PREVIEW_ACCESS_EVENT = 'aegis:open-preview-access';

export const openPreviewAccessModal = () => {
  window.dispatchEvent(new CustomEvent(PREVIEW_ACCESS_EVENT));
};

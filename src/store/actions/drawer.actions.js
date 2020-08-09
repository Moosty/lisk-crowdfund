export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

export const openDrawer = modalType => ({
  type: OPEN_DRAWER,
  modalType,
});

export const closeDrawer = () => ({
  type: CLOSE_DRAWER,
});

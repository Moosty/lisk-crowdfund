export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_NEWSLETTER_SHOWN = 'SET_NEWSLETTER_SHOWN';
export const SET_NEWSLETTER_SUBMITTED = 'SET_NEWSLETTER_SUBMITTED';
export const INIT_NEWSLETTER = 'INIT_NEWSLETTER';

export const openModal = (modalType, fundraiser=null) => ({
  type: OPEN_MODAL,
  modalType,
  fundraiser
});

export const closeModal = (clear=false) => ({
  type: CLOSE_MODAL,
  clear,
});
export const setShownNewsletter = (timestamp) => ({
  type: SET_NEWSLETTER_SHOWN,
  timestamp,
});
export const setSubmittedNewsletter = () => ({
  type: SET_NEWSLETTER_SUBMITTED,
});

export const initNewsletter = () => ({
  type: INIT_NEWSLETTER,
});

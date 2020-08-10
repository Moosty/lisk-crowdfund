export const CREATE_CROWDFUND = '[crowdfund] create crowdfund';
export const UPDATE_CROWDFUND_FORM = '[crowdfund] update crowdfund form';
export const CLEAR_CROWDFUND_FORM = '[crowdfund] clear crowdfund form';

export const updateCrowdfundForm = update => ({
  type: UPDATE_CROWDFUND_FORM,
  update
});

export const clearCrowdfundForm = () => ({
  type: CLEAR_CROWDFUND_FORM,
});

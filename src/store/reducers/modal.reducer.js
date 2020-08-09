import * as Actions from '../actions';

const defaultState = {
  open: false,
  type: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.OPEN_MODAL:
      return {
        open: true,
        type: action.modalType,
      }
    case Actions.CLOSE_MODAL:
      return {
        open: false,
        type: null,
      }
    default:
      return {
        ...state
      }
  }
}

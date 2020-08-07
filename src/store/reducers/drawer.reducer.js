import * as Actions from '../actions';

const defaultState = {
  open: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.OPEN_DRAWER:
      return {
        open: true,
      }
    case Actions.CLOSE_DRAWER:
      return {
        open: false,
      }
    default:
      return {
        ...state
      }
  }
}

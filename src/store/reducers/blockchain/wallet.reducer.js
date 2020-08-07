import * as Actions from '../../actions';

const defaultState = {
  passphrase: null,
  account: {},
  wallet: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.SET_PASSPHRASE:
      return {
        ...state,
        passphrase: action.passphrase,
      }
    case Actions.LOGOUT_ACCOUNT:
      return {
        ...defaultState,
      }
    case Actions.SET_ACCOUNT:
      return {
        ...state,
        account: action.account,
      }
    case Actions.UPDATE_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          ...action.account,
        }
      }
    default:
      return {
        ...state
      }
  }
}

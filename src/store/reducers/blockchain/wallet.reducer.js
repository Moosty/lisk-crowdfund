import * as Actions from '../../actions';

const defaultState = {
  passphrase: null,
  account: {},
  wallet: [],
  sprinkler: {
    running: false,
    success: null,
    error: null,
  }
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
    case Actions.SIGNUP:
      return {
        ...state,
        sprinkler: {
          loading: true,
          success: null,
          error: null,
        },
      }
    case Actions.SPRINKLER_SUCCESS:
      return {
        ...state,
        sprinkler: {
          loading: false,
          success: true,
          error: null,
        },
      }
    case Actions.SPRINKLER_ERROR:
      return {
        ...state,
        sprinkler: {
          loading: false,
          success: false,
          error: action.error,
        },
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

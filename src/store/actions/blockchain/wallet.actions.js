import { config } from '../../../config';
import * as Actions from "..";

export const ACCOUNT_SUCCESS = "ACCOUNT_SUCCESS";
export const ACCOUNT_ERROR = "ACCOUNT_ERROR";
export const SET_PASSPHRASE = "SET_PASSPHRASE";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const LOAD_ACCOUNT = "LOAD_ACCOUNT";
export const GET_ACCOUNT = "GET_ACCOUNT";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const UPDATE_NONCE = "UPDATE_NONCE";
export const LOGOUT_ACCOUNT = "LOGOUT_ACCOUNT";
export const SIGNUP = "SIGNUP";
export const SPRINKLER_SUCCESS = "SPRINKLER_SUCCESS";
export const SPRINKLER_ERROR = "SPRINKLER_ERROR";

export const updateNonce = () => ({
  type: UPDATE_NONCE,
});

export const logoutAccount = () => ({
  type: LOGOUT_ACCOUNT,
})

export const sprinklerSuccess = () => ({
  type: SPRINKLER_SUCCESS,
})
export const sprinklerError = error => ({
  type: SPRINKLER_ERROR,
  error
})

export const loginWithPassphrase = passphrase => ({
  type: SET_ACCOUNT,
})

export const setPassphrase = passphrase => {
  return {
    type: SET_PASSPHRASE,
    passphrase,
  }
}

export const setAccount = account => {
  return {
    type: SET_ACCOUNT,
    account,
  }
}

export const loadAccount = (address, action) => {
  return (dispatch) => {
    return fetch(`${config.apiUrl}accounts/?address=${address}`)
      .then(result => result.json())
      .then(json => {
        if (json && json.data && json.data[0]) {
          return dispatch(action(json.data[0]))
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export const signUpAction = () => ({
  type: SIGNUP,
});

export const signUp = (tx, api) => {
  return async (dispatch) => {
    try {
      dispatch(Actions.signUpAction)
      const result = await api.transactions.broadcast(tx);
      if (result) {
        console.log(result)
        dispatch(Actions.sprinklerSuccess());
      }
    } catch (err) {
      console.error(err)
      dispatch(Actions.sprinklerError(err));
    }
  }
}

export const doSprinkler = (tx, api) => {
  return async (dispatch) => {
    try {
      const result = await api.transactions.broadcast(tx);
      if (result) {
        dispatch(Actions.sprinklerSuccess());
      }
    } catch (err) {
      dispatch(Actions.sprinklerError(err));
    }
  }
}

export const getAccount = account => {
  return {
    type: GET_ACCOUNT,
    account
  }
}

export const updateAccount = account => {
  return {
    type: UPDATE_ACCOUNT,
    account
  }
}

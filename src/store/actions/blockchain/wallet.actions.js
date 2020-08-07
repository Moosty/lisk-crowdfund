import { config } from '../../../config';

export const ACCOUNT_SUCCESS = "ACCOUNT_SUCCESS";
export const ACCOUNT_ERROR = "ACCOUNT_ERROR";
export const SET_PASSPHRASE = "SET_PASSPHRASE";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const LOAD_ACCOUNT = "LOAD_ACCOUNT";
export const GET_ACCOUNT = "GET_ACCOUNT";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const LOGOUT_ACCOUNT = "LOGOUT_ACCOUNT";

export const logoutAccount = () => ({
  type: LOAD_ACCOUNT,
})


export const loginWithPassphrase = passphrase => {

}

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

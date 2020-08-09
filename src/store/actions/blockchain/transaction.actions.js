import { config } from '../../../config';
import * as Actions from '../';
export const DO_TRANSACTION = 'DO_TRANSACTION';
export const GET_TRANSACTION = 'GET_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';

export const getTransaction = id => ({
  type: GET_TRANSACTION,
  id,
})

export const loadTransaction = id => {
  return (dispatch) => {
    return fetch()
  }
}

export const doTransaction = tx => {
  return (dispatch) => {
    return fetch(`${config.apiUrl}transactions`, {
      method: "POST",
      body: tx,
    })
      .then(result => result.json())
      .then(json => {
        dispatch(Actions.newLog(json, 'success'));
      })
      .catch(err => {
        dispatch(Actions.newLog(err, 'error'));
      })
  }
}

export const addTransaction = tx => ({
  type: ADD_TRANSACTION,
  tx,
})

export const addTransactions = txs => ({
  type: ADD_TRANSACTIONS,
  txs,
})

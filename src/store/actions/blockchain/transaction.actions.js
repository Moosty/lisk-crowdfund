import * as Actions from '../';
import { config } from "../../../config";

export const DO_TRANSACTION = 'DO_TRANSACTION';
export const GET_TRANSACTION = 'GET_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const ERROR_TRANSACTION = 'ERROR TX';
export const SUCCESS_TRANSACTION = 'SUCCESS TX';

export const getTransaction = id => ({
  type: GET_TRANSACTION,
  id,
})

export const loadTransaction = id => {
  return (dispatch) => {
    return fetch()
  }
}

export const doTransactionAction = (id) => ({
  type: DO_TRANSACTION,
  id,
});

export const transactionSuccess = (id) => ({
  type: SUCCESS_TRANSACTION,
  id
});
export const transactionError = (id, error) => ({
  type: ERROR_TRANSACTION,
  id,
  error,
});

export const doTransaction = (tx, api) => (async (dispatch) => {
  try {
    dispatch(Actions.doTransactionAction(tx.id));
    const options = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(tx.toJSON()),
      method: "POST"
    }
    const result = await fetch(`${config.apiUrl}transactions`, options);
    if (result) {
      const jsonResult = await result.json();
      if (jsonResult && jsonResult.errors) {
        if (jsonResult.errors.length > 0) {
          dispatch(Actions.transactionError(tx.id, jsonResult.errors));
        } else {
          dispatch(Actions.transactionError(tx.id, [{message: jsonResult.message}]));
        }
      } else {
        dispatch(Actions.updateNonce());
        dispatch(Actions.transactionSuccess(tx.id));
      }
    }
  } catch (err) {
    console.error(err)
  }
});

export const addTransaction = tx => ({
  type: ADD_TRANSACTION,
  tx,
});

export const addTransactions = txs => ({
  type: ADD_TRANSACTIONS,
  txs,
});

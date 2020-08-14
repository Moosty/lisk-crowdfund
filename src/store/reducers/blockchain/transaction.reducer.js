import * as Actions from '../../actions';
import { getNow } from "../../../utils";

const defaultState = {
  txs: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.DO_TRANSACTION:
      return {
        ...state,
        txs: [
          ...state.txs,
          {id: action.id, running: true, success: null, error: null, timestamp: new Date().getTime()},
        ]
      }
    case Actions.ERROR_TRANSACTION:
      return {
        ...state,
        txs: [
          ...state.txs.filter(tx => tx.id !== action.id),
          { id: action.id, running: false, success: false, error: action.error, timestamp: new Date().getTime() }
        ]
      }
    case Actions.SUCCESS_TRANSACTION:
      return {
        ...state,
        txs: [
          ...state.txs.filter(tx => tx.id !== action.id),
          { id: action.id, running: false, success: true, error: null, timestamp: new Date().getTime() }
        ]
      }
    default:
      return {
        ...state
      }
  }
}

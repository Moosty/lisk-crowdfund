import * as Actions from '../actions';

const defaultState = {
  logs: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.NEW_LOG:
      return {
        ...state,
        logs: [...state.logs, { log: action.log, type: action.type, status: 1 }],
      }
    case Actions.UPDATE_LOG:
      return {
        ...state,
        logs: [...state.logs.map((log, i) => {
          if (i === action.index) {
            return action.log;
          }
          return log;
        })]
      }
    default:
      return {
        ...state
      }
  }
}

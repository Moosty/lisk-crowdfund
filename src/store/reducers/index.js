import { combineReducers } from 'redux';
import blockchain from './blockchain';

const createReducer = asyncReducers =>
  combineReducers({
    blockchain,
    ...asyncReducers
  });

export default createReducer;

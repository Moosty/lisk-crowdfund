import { combineReducers } from 'redux';
import blockchain from './blockchain';
import logger from './logger.reducer';
import modal from './modal.reducer';
import drawer from './drawer.reducer';

const createReducer = asyncReducers =>
  combineReducers({
    blockchain,
    logger,
    modal,
    drawer,
    ...asyncReducers
  });

export default createReducer;

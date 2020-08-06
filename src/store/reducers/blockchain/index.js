import { combineReducers } from 'redux';
import crowdfund from './crowdfund.reducer';
import wallet from './wallet.reducer';

const blockchainReducers = combineReducers({
  crowdfund,
  wallet,
});

export default blockchainReducers;

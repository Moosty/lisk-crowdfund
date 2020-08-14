import { combineReducers } from 'redux';
import crowdfund from './crowdfund.reducer';
import wallet from './wallet.reducer';
import transaction from './transaction.reducer';

const blockchainReducers = combineReducers({
  crowdfund,
  wallet,
  transaction,
});

export default blockchainReducers;

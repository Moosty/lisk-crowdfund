import { combineReducers } from 'redux';
import crowdfund from './crowdfund.reducer';
import crowdfunds from './crowdfunds.reducer';
import users from './users.reducer';
import wallet from './wallet.reducer';
import transaction from './transaction.reducer';

const blockchainReducers = combineReducers({
  crowdfund,
  crowdfunds,
  users,
  wallet,
  transaction,
});

export default blockchainReducers;

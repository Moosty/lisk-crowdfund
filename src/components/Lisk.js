import React, { useContext, useEffect, useState } from 'react';
import { config } from "../config";

import { useDispatch, useSelector } from "react-redux";
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import AppContext from "app/AppContext";

export const LiskComponent = withReducer('LiskComponent', reducer)(props => {
  const dispatch = useDispatch();
  const { api } = useContext(AppContext);
  const [lastHeight, setLastHeight] = useState(null);
  const { account } = useSelector(({blockchain}) => blockchain.wallet);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Initialize blockchain data
    dispatch(Actions.getUsers());
    dispatch(Actions.getCrowdfunds());
    loadUsers(103);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      watchBlocks()
      setTimer(timer + 1);
    }, 5000)
  }, [timer]);

  const watchBlocks = async () => {
    const lastBlocks = await api.blocks.get({
      sort: 'height:desc',
      limit: 1
    });
    if (lastBlocks.data && lastBlocks.data.length > 0) {
      if (lastBlocks.data[0].height > lastHeight) {
        console.log(account)
        if (account.address) {
          dispatch(Actions.loadAccount(account.address, Actions.updateAccount))
        }
        setLastHeight(lastBlocks.data[0].height)
        if (lastBlocks.data[0].numberOfTransactions > 0) {
          getBlockTxs(lastBlocks.data[0].height);
        }
      }
    }
    // setTimeout(watchBlocks, 5000);
  }

  const getBlockTxs = async height => {
    const txs = await api.transactions.get({
      height
    });
    if (txs && txs.data && txs.data.length > 0) {
      // eslint-disable-next-line array-callback-return
      txs.data.map(t => {
        if (t.type === 13001) {
          dispatch(Actions.getUsers());
        } else {
          dispatch(Actions.getCrowdfunds());
        }
      });
    }
  };

  const loadUsers = async offset => {
    const users = await fetch(
      `${config.extendedApiUrl}transactions?asset=username&limit=1000&offset=${offset}`
    );
    if (users.ok) {
      const json = await users.json();
      if (json.data && json.data.length > 0) {
        dispatch(Actions.getUsers(json.data));
      }
      if (json.data && json.data.length >= 1000) {
        loadUsers(offset + 1000);
      }
    }
  };

  return <div></div>;
});

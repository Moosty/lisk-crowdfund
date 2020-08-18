import React, { useEffect } from 'react';
import { config } from "../config";

import { useDispatch } from "react-redux";
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';

export const LiskComponent = withReducer('LiskComponent', reducer)(props => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize blockchain data
    dispatch(Actions.getUsers());
    dispatch(Actions.getCrowdfunds());
    loadUsers(103);
  }, []);

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

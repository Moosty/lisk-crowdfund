import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import { SnackbarProvider, useSnackbar } from 'notistack';

const NotifierComponent = withReducer('Notifier', reducer)(props => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const {txs} = useSelector(({blockchain}) => blockchain.transaction);

  useEffect(() => {
    if (enqueueSnackbar) {
      txs.filter(tx => tx.timestamp + 6000 > new Date().getTime()).map(tx => {
        if (tx.running) {
          enqueueSnackbar(`Sending Transaction ${tx.id}`, {variant: "info", preventDuplicate: true,});
        } else if (tx.success) {
          enqueueSnackbar(`Transaction received on server ${tx.id}`, {variant: "success", preventDuplicate: true,});
        } else if (tx.error && tx.error.length > 0) {
          tx.error.map((err, i) => enqueueSnackbar(err.message, {variant: "error", preventDuplicate: true,}));
        }
      });
    }
    // const running = [];
    // const errors = [];
    // const success = [];
    // txs.map(tx => {
    //   if (tx.running) {
    //
    //   }
    // })
  }, [txs, enqueueSnackbar]);

  return (<></>);
});

export const Notifier = () => {
  return (<SnackbarProvider maxSnack={5} anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}>
    <NotifierComponent />
  </SnackbarProvider>);
};

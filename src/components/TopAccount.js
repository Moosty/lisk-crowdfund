import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import IconButton from "@material-ui/core/IconButton";
import { utils } from '@liskhq/lisk-transactions';
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const { convertBeddowsToLSK } = utils;
const useStyles = makeStyles((theme) => ({
  menuButton: {

    float: 'right',
  },
  hide: {
    display: 'none',
  },
}));
export const TopAccount = withReducer('TopAccount', reducer)(props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {wallet} = useSelector(({blockchain}) => blockchain);
  const {open} = useSelector(({drawer}) => drawer);

  return <div className="">
    {wallet.account && wallet.account.address && <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={() => dispatch(Actions.openDrawer())}
      edge="start"
      className={clsx(classes.menuButton, open && classes.hide)}
    >
      <div className="flex flex-row h-full items-center justify-evenly ">
        <div className="flex-col flex mx-4 ">
          <h1 className="text-sm font-bold ">{wallet.account.username}</h1>
          <h2 className="text-sm">{convertBeddowsToLSK(wallet.account.balance)} LSK</h2>
        </div>
        <Avatar alt={`${wallet.account.username} avatar`} src="/images/pexels-photo-3951901.jpeg" className={classes.small}/>
      </div>
    </IconButton>}
  </div>;
});

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { utils } from '@liskhq/lisk-transactions';
import { Accordeon } from "./Accordeon";

const {convertBeddowsToLSK} = utils;

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginTop: 4,
    marginBottom: 4,
  },
}));
export const TopDrawer = withReducer('TopDrawer', reducer)(props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const {open} = useSelector(({drawer}) => drawer);
  const {wallet} = useSelector(({blockchain}) => blockchain);

  return <Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="right"
    open={open}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeader}>
      <div onClick={() => dispatch(Actions.closeDrawer())}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
      </div>
    </div>
    <Divider/>
    {wallet && wallet.account && wallet.account.balance && <div className="flex flex-col p-2 items-center">
      <Avatar alt="Remy Sharp" src="/images/pexels-photo-3951901.jpeg" className={classes.large}/>
      <h1 className="text-lg font-bold ">{wallet.account.username}</h1>
      <h2 className="text-xl mb-4">{convertBeddowsToLSK(wallet.account.balance)} LSK</h2>
      <Button size="small" variant="contained" color="secondary" className="my-4"
              onClick={() => console.log("todo goto wallet")}>My Wallet</Button>
    </div>}
    <Divider/>
    <Accordeon />
    <Divider/>
  </Drawer>;
});

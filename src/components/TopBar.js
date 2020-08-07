import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ModalAddCrowdfund, ModalSignIn } from '../components';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import withReducer from "../store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import reducer from "../store/reducers";
import * as Actions from '../store/actions';
import { TopAccount } from "./TopAccount";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {

    float: 'right',
  },
  hide: {
    display: 'none',
  },
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginTop: 4,
    marginBottom: 4,
  },
}));

export const TopBar = withReducer('TopBar', reducer)(props => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const {wallet} = useSelector(({blockchain}) => blockchain);
  const {open} = useSelector(({drawer}) => drawer);

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        style={{backgroundColor: "#262b38"}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{BackgroundColor: "#262b38", display: "flex", justifyContent: "space-between"}}>
          <ModalAddCrowdfund/>
          <ModalSignIn/>
          <TopAccount />
        </Toolbar>
      </AppBar>

      <Drawer
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
        <div className="flex flex-col p-2 items-center">
          <Avatar alt="Remy Sharp" src="/images/pexels-photo-3951901.jpeg" className={classes.large}/>
          <h1 className="text-lg font-bold ">Raphael</h1>
          <h2 className="text-xl mb-4">15.420 LSK</h2>
          <Button size="small" variant="contained" color="secondary" className="my-4">My Wallet</Button>
        </div>
        <Divider/>
        <Divider/>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      </main>
    </div>
  );
});

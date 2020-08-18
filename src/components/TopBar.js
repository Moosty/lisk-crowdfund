import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ModalAddCrowdfund, ModalSignIn } from '.';
import withReducer from "../store/withReducer";
import { useSelector } from "react-redux";
import { ModalNewsletterSignUp } from "./";
import { TopAccount } from "./TopAccount";
import { drawerWidth, TopDrawer } from "./TopDrawer";
import reducer from "../store/reducers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export const TopBar = withReducer(
  "TopBar",
  reducer
)((props) => {
  const classes = useStyles();
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
        <Toolbar
          style={{
            BackgroundColor: "#262b38",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ModalAddCrowdfund/>
          <ModalNewsletterSignUp/>
          <ModalSignIn/>
          <TopAccount/>
        </Toolbar>
      </AppBar>
      <TopDrawer/>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      ></main>
    </div>
  );
});

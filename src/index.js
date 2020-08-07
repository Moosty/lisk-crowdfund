import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './styles/main.css';
import store from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Crowdfund, Overview, SignIn, SignUp, Wallet } from "./views";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/wallet">
          <Wallet />
        </Route>
        <Route path="/crowdfund">
          <Crowdfund />
        </Route>
        <Route path="/overview">
          <Overview />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

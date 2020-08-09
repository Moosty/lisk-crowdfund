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
import AppContext from './AppContext';
import { config } from "./config";
import { APIClient } from "@liskhq/lisk-api-client";

const api = new APIClient([config.apiUrlClient]);
const networkIdentifier = '93d00fe5be70d90e7ae247936a2e7d83b50809c79b73fa14285f02c842348b3e';

ReactDOM.render(
  <AppContext.Provider
    value={{
      api,
      networkIdentifier
    }}
  >
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
    </Provider>
  </AppContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

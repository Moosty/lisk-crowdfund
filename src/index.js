import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import './styles/main.css';
import store from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Crowdfund, Overview, SignIn, SignUp, Wallet } from "./views";
import { Provider } from "react-redux";
import AppContext from './AppContext';
import { config } from "./config";
import { APIClient } from "@liskhq/lisk-api-client";
import { LiskComponent, ModalNewsletterSignUp, Notifier } from "./components";

const api = new APIClient([config.apiUrlClient]);
const networkIdentifier = '93d00fe5be70d90e7ae247936a2e7d83b50809c79b73fa14285f02c842348b3e';
export const epoch = new Date('2020-08-01T00:00:00.000Z').getTime() / 1000;

ReactDOM.render(
  <AppContext.Provider
    value={{
      api,
      networkIdentifier,
      epoch,
    }}
  >
    <Provider store={store}>
      <LiskComponent />
      <Notifier />
      <ModalNewsletterSignUp/>
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/wallet">
            <Wallet/>
          </Route>
          <Route path="/crowdfund/:publicKey">
            <Crowdfund/>
          </Route>
          <Route path="/crowdfund">
            <Crowdfund/>
          </Route>
          <Route path="/overview/:filter">
            <Overview/>
          </Route>
          <Route path="/overview">
            <Overview/>
          </Route>
          <Route path="/">
            <App/>
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

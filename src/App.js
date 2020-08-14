import "./App.css";

import { Link } from "react-router-dom";
import React from "react";

import { TransactionModal } from "./components";

function App() {
  return (
    <div className="App">
      <header className="flex-1 flex-col">
        <ul>
          <li>
            <Link to="/">here</Link>
          </li>
          <li>
            <Link to="/signup">sign up</Link>
          </li>
          <li>
            <Link to="/signin">sign in</Link>
          </li>
          <li>
            <Link to="/wallet">wallet</Link>
          </li>
          <li>
            <Link to="/overview">overview</Link>
          </li>
          <li>
            <Link to="/crowdfund">crowdfund</Link>
          </li>
        </ul>
      </header>
      <TransactionModal description="Sign your transaction to add a new project." />
    </div>
  );
}

export default App;

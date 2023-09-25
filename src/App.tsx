import React from "react";
import { BrowserRouter, Switch } from 'react-router-dom';

import RestrictedRoute from "./auth/RestrictedRoute";
import Login from "./pages/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <RestrictedRoute exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RestrictedRoute from "./auth/RestrictedRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/tasks" component={Tasks} />
        <RestrictedRoute exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

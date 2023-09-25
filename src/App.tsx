import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RestrictedRoute from "./auth/RestrictedRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Tasks from "./pages/Tasks";
import Planets from "./pages/Planets";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <RestrictedRoute exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/tasks" component={Tasks} />
        <PrivateRoute exact path="/planets" component={Planets} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

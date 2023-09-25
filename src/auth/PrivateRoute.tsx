import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getLocalStorageAuth } from "../utils/local-storage";

const PrivateRoute = (props:any) => {
  const token = getLocalStorageAuth();

  return <>{ token ? <Route {...props} /> : <Redirect to="/login" /> }</>;
};

export default PrivateRoute;

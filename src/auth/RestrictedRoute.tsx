import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getLocalStorageAuth } from "../utils/local-storage";

const RestrictedRoute = (props:any) => {
  const token = getLocalStorageAuth();
  
  return <>{ !token ? <Route {...props} /> : <Redirect to="/" /> }</>;
};

export default RestrictedRoute;

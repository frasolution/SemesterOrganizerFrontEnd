import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { getToken } from "../../utils/jwt";

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const token = getToken();
  if (token !== null) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default PrivateRoute;

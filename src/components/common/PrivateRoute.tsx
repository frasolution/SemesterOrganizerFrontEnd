import React from "react";
import { Route, RouteProps /*Redirect*/ } from "react-router-dom";
// import { getToken } from "../../utils/jwt";
// TODO: Realize PrivateRoute component which checks the token and renders either the desired page or redirects to the homepage
export default function PrivateRoute({ exact, path /*component: Component*/ }: RouteProps) {
  // const hasToken = getToken() !== null;
  return (
    <Route
      exact={exact}
      path={path}
      // render={(props) => (hasToken ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}

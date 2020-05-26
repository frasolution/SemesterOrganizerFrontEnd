import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./common/PrivateRoute";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TeamsPage from "./pages/TeamsPage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/teams" component={TeamsPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}
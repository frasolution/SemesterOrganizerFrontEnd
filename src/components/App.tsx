import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import PrivateRoute from "./common/PrivateRoute";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TeamsPage from "./pages/TeamsPage";
import CoursesPage from "./pages/CoursesPage";
import TasksPage from "./pages/TasksPage";
import NotesPage from "./pages/NotesPage";

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/teams" component={TeamsPage} />
          <PrivateRoute exact path="/teams/:teamId/courses" component={CoursesPage} />
          <PrivateRoute exact path="/teams/:teamId/courses/:courseId/tasks" component={TasksPage} />
          <PrivateRoute exact path="/teams/:teamId/courses/:courseId/notes" component={NotesPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

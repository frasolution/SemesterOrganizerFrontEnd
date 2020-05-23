import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./common/PrivateRoute";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TeamsPage from "./pages/TeamsPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196F3",
      light: "#BBDEFB",
      dark: "#1976D2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF4081",
      light: "#FF79B0",
      dark: "#C60055",
      contrastText: "#212121",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/teams" component={TeamsPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;

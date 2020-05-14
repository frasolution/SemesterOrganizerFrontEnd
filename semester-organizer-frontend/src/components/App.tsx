import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { HomePage } from "./HomePage";
import { ErrorPage } from "./ErrorPage";

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
          <Route path="/" exact component={HomePage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;

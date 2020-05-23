import React from "react";
import styled from "styled-components";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import heroImg from "../assets/hero.jpg";
import HeaderBar from "./HeaderBar";
import SignUpDialog from "./dialogs/SignUpDialog";
import LoginDialog from "./dialogs/LoginDialog";

interface StyledProps {
  img: any;
}

const Hero = styled.div<StyledProps>`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.img});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: "100vh",
    },
    title: {
      flexGrow: 1,
    },
    greeting: {
      margin: theme.spacing(2),
      color: "white",
    },
    button: {
      margin: theme.spacing(2),
    },
  })
);

export function HomePage() {
  const classes = useStyles();

  return (
    <Hero img={heroImg}>
      <HeaderBar title="FRA UAS Semester Organizer" />
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.greeting}>
            Welcome
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <SignUpDialog className={classes.button} />
            </Grid>
            <Grid item>
              <LoginDialog className={classes.button} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hero>
  );
}

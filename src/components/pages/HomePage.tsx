import React from "react";
import styled from "styled-components";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import heroImg from "../../assets/hero.jpg";
import SignUpDialog from "../dialogs/SignUpDialog";
import LoginDialog from "../dialogs/LoginDialog";

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
      marginBottom: theme.spacing(1),
      color: "white",
    },
    subtitle: {
      marginBottom: theme.spacing(1),
      color: "white",
    },
  })
);

export default function HomePage() {
  const classes = useStyles();

  return (
    <Hero img={heroImg}>
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.greeting}>
            Welcome
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.subtitle}>
            Organize your CS modules of the Frankfurt University of Applied Sciences
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <SignUpDialog />
            </Grid>
            <Grid item>
              <LoginDialog />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hero>
  );
}

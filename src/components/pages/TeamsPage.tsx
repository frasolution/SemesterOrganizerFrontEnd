import React, { useState, useEffect, Fragment } from "react";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles, Typography, Button, Grid } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import { httpGet } from "../../utils/http-client";
import CreateTeamDialog from "../dialogs/CreateTeamDialog";

type Team = {
  id: number;
  name: string;
};

const useStyles = makeStyles(() => ({
  button: {
    margin: "8px",
  },
  error: {
    margin: "8px",
  },
}));

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [hasError, setError] = useState(false);
  const classes = useStyles();

  async function fetchTeams() {
    const response = await httpGet("/api/teams", true);
    response
      .json()
      .then((res) => setTeams(res))
      .catch((err) => setError(err));
  }

  useEffect(() => {
    document.title = "Your Teams | FRA UAS Semester Organizer";
    fetchTeams();
  }, []);

  return (
    <Fragment>
      <HeaderBar title="Your Teams">
        <CreateTeamDialog />
      </HeaderBar>
      <Grid container direction="column">
        <Grid item>
          {teams.map((team: Team, index) => (
            <Button
              key={index}
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              startIcon={<GroupIcon fontSize="large" />}
            >
              {team.name}
            </Button>
          ))}
          {hasError ? (
            <Typography variant="body1" color="error" className={classes.error}>
              Couldn&apos;t fetch your teams.
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </Fragment>
  );
}

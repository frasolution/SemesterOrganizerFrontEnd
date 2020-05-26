import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles, Typography, Button, Grid } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import CreateTeamDialog from "../dialogs/CreateTeamDialog";
import { getHeaders } from "../../utils/http-client";
import { Team } from "../../types/types";

const useStyles = makeStyles(() => ({
  button: {
    margin: "8px",
  },
  error: {
    margin: "8px",
  },
}));

export default function TeamsPage() {
  const [teams, setTeams] = useState([] as Team[]);
  const [hasError, setError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams", {
          headers: getHeaders(true),
          cancelToken: source.token,
        });
        setTeams(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          setError(true);
        }
      }
    };
    fetchTeams();
    document.title = "Your Teams | FRA UAS Semester Organizer";

    return () => source.cancel();
  }, []);

  return (
    <Fragment>
      <HeaderBar title="Your Teams">
        <CreateTeamDialog teams={teams} updateTeams={setTeams} />
      </HeaderBar>
      <Grid container direction="column">
        <Grid item>
          {teams.map((team, index) => (
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

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { makeStyles, Typography, Grid, CardActionArea, Card, CardContent } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import CreateTeamDialog from "../dialogs/CreateTeamDialog";
import { getToken } from "../../utils/jwt";
import { Team } from "../../types/types";
import { Link } from "react-router-dom";
import LogoutDialog from "../dialogs/LogoutDialog";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  error: {
    margin: "16px",
  },
}));

export default function TeamsPage() {
  const [teams, setTeams] = useState([] as Team[]);
  const [teamsCount, setTeamsCount] = useState(0);
  const [hasError, setError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
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
  }, [teamsCount]);

  return (
    <Fragment>
      <HeaderBar title="Your Teams">
        <CreateTeamDialog teamsCount={teamsCount} updateTeamsCount={setTeamsCount} />
        <LogoutDialog />
      </HeaderBar>
      <Grid container direction="row">
        {teams.map((team, index) => (
          <Grid item key={index}>
            <Card elevation={8} className={classes.card}>
              <CardActionArea component={Link} to={`/teams/${team.id}/courses`}>
                <CardContent>
                  <Typography variant="h6">{team.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {hasError ? (
          <Typography variant="body1" color="error" className={classes.error}>
            Couldn&apos;t fetch your teams.
          </Typography>
        ) : null}
      </Grid>
    </Fragment>
  );
}

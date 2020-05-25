import React, { useState, useEffect } from "react";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles, Typography, Button } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import { FlexContainer } from "../../utils/styled/styled-components";
import { httpGet } from "../../utils/http-client";

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
    <div>
      <HeaderBar title="Your Teams" />
      <FlexContainer>
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
      </FlexContainer>
      {hasError ? (
        <Typography variant="body1" color="error" className={classes.error}>
          Couldn&apos;t fetch your teams.
        </Typography>
      ) : null}
    </div>
  );
}

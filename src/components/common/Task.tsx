import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  makeStyles,
  Divider,
} from "@material-ui/core";

import { CardContainer } from "../styled-components";

const useStyles = makeStyles(() => ({
  cardHeader: {
    padding: "8px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function Task() {
  const classes = useStyles();

  return (
    <CardContainer>
      <Card elevation={8}>
        <CardHeader
          className={classes.cardHeader}
          title={
            <Typography variant="body2" component={"span"}>
              Task title comes here
            </Typography>
          }
        />
        <Divider />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component={"p"}>
            Task content comes here
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          Actions come here
        </CardActions>
      </Card>
    </CardContainer>
  );
}

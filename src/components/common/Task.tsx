import React from "react";
import { Card, CardContent, Typography, CardActions, makeStyles } from "@material-ui/core";

import { CardContainer } from "../styled-components";

type TaskProps = {
  id: number;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: number | null;
  isCompleted: boolean;
};

const useStyles = makeStyles(() => ({
  cardHeader: {
    padding: "8px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function Task({
  id,
  title,
  description,
  dueDate,
  priority,
  isCompleted,
}: TaskProps) {
  const classes = useStyles();

  return (
    <CardContainer>
      <Card elevation={8}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component={"p"}>
            {title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          Actions come here
        </CardActions>
      </Card>
    </CardContainer>
  );
}

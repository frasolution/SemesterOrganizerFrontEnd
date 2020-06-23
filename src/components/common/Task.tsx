import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import {
  Card,
  Typography,
  CardActions,
  makeStyles,
  CardHeader,
  IconButton,
} from "@material-ui/core";

import ViewTaskDialog from "../dialogs/tasks/ViewTaskDialog";
import EditTaskDialog from "../dialogs/tasks/EditTaskDialog";
import DeleteTaskDialog from "../dialogs/tasks/DeleteTaskDialog";
import { CardContainer } from "../styled-components";

type TaskProps = {
  columnId: number;
  id: number;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: number | null;
  isCompleted: boolean;
};

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: "8px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  complete: {
    color: theme.palette.success.main,
  },
}));

export default function Task({
  columnId,
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
        <CardHeader
          title={
            <Typography variant="body1" color="textSecondary" component={"p"}>
              {title}
            </Typography>
          }
          action={
            isCompleted ? null : (
              <IconButton
                size="small"
                className={classes.complete}
                onClick={() => console.log("completed")}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
            )
          }
        />
        <CardActions disableSpacing className={classes.actions}>
          <ViewTaskDialog
            id={id}
            title={title}
            description={description}
            dueDate={dueDate}
            priority={priority}
            isCompleted={isCompleted}
          />
          <EditTaskDialog
            id={id}
            title={title}
            description={description}
            dueDate={dueDate}
            priority={priority}
            isCompleted={isCompleted}
          />
          <DeleteTaskDialog id={id} columnId={columnId} />
        </CardActions>
      </Card>
    </CardContainer>
  );
}

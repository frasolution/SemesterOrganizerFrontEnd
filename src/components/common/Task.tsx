import React from "react";
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {
  Card,
  Typography,
  CardActions,
  makeStyles,
  CardHeader,
  IconButton,
  CardContent,
  Chip,
} from "@material-ui/core";

import ViewTaskDialog from "../dialogs/tasks/ViewTaskDialog";
import EditTaskDialog from "../dialogs/tasks/EditTaskDialog";
import DeleteTaskDialog from "../dialogs/tasks/DeleteTaskDialog";
import MoveTaskDialog from "../dialogs/tasks/MoveTaskDialog";
import { CardContainer } from "../styled-components";
import { getToken } from "../../utils/jwt";
import { useParams } from "react-router-dom";

type TaskProps = {
  columnId: string;
  id: string;
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
    justifyContent: "space-between",
  },
  crudActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  complete: {
    color: theme.palette.success.main,
  },
  incomplete: {
    color: theme.palette.error.main,
  },
  open: {
    backgroundColor: theme.palette.error.main,
    color: "white",
  },
  closed: {
    backgroundColor: theme.palette.success.main,
    color: "white",
  },
  card: {
    border: "1px solid lightgrey",
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
  const { teamId, courseId } = useParams();
  const classes = useStyles();

  async function handleComplete() {
    try {
      const response = await axios.patch(
        `/api/teams/${teamId}/courses/${courseId}/columns/${columnId}/tasks/${id}/complete`,
        { isCompleted },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        }
      );
      if (response.status === 200) {
        window.location.reload(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CardContainer>
      <Card elevation={8} className={classes.card}>
        <CardHeader
          title={
            isCompleted ? (
              <Chip className={classes.closed} label="CLOSED" />
            ) : (
              <Chip className={classes.open} label="OPEN" />
            )
          }
          action={
            isCompleted ? (
              <IconButton size="small" className={classes.incomplete} onClick={handleComplete}>
                <ClearIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton size="small" className={classes.complete} onClick={handleComplete}>
                <CheckIcon fontSize="small" />
              </IconButton>
            )
          }
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary" component={"p"}>
            {title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          <ViewTaskDialog
            id={id}
            title={title}
            description={description}
            dueDate={dueDate}
            priority={priority}
            isCompleted={isCompleted}
          />
          <div className={classes.crudActions}>
            <MoveTaskDialog
              id={id}
              columnId={columnId}
              title={title}
              description={description}
              dueDate={dueDate}
              priority={priority}
              isCompleted={isCompleted}
            />
            <EditTaskDialog
              id={id}
              columnId={columnId}
              title={title}
              description={description}
              dueDate={dueDate}
              priority={priority}
              isCompleted={isCompleted}
            />
            <DeleteTaskDialog id={id} columnId={columnId} />
          </div>
        </CardActions>
      </Card>
    </CardContainer>
  );
}

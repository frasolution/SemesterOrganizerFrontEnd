import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, IconButton } from "@material-ui/core";

import { TaskType } from "../../../types/types";

type EditTaskDialogProps = TaskType;

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
}));

export default function EditTaskDialog(props: EditTaskDialogProps) {
  const classes = useStyles();

  return (
    <IconButton className={classes.button} size="small" onClick={() => console.log("view task")}>
      <EditIcon fontSize="small" />
    </IconButton>
  );
}

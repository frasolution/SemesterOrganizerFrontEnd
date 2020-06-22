import React from "react";
import ViewIcon from "@material-ui/icons/Visibility";
import { IconButton, makeStyles } from "@material-ui/core";

import { TaskType } from "../../../types/types";

type ViewTaskDialogProps = TaskType;

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
}));

export default function ViewTaskDialog(props: ViewTaskDialogProps) {
  const classes = useStyles();

  return (
    <IconButton className={classes.button} size="small" onClick={() => console.log("view task")}>
      <ViewIcon fontSize="small" />
    </IconButton>
  );
}

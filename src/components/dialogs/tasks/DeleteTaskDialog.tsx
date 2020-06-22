import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, IconButton } from "@material-ui/core";

type DeleteTaskDialogProps = {
  id: number;
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
}));

export default function DeleteTaskDialog({ id }: DeleteTaskDialogProps) {
  const classes = useStyles();

  return (
    <IconButton className={classes.button} size="small" onClick={() => console.log("view task")}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}

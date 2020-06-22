import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

type CreateTaskDialogProps = {
  columnId: number;
};

export default function CreateTaskDialog({ columnId }: CreateTaskDialogProps) {
  return (
    <IconButton color="inherit" onClick={() => console.log("clicked create task ", columnId)}>
      <AddIcon fontSize="small" />
    </IconButton>
  );
}

import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

type CreateTaskButtonProps = {
  columnId: number;
};

export default function CreateTaskButton({ columnId }: CreateTaskButtonProps) {
  return (
    <IconButton color="inherit" onClick={() => console.log("clicked create task ", columnId)}>
      <AddIcon fontSize="small" />
    </IconButton>
  );
}

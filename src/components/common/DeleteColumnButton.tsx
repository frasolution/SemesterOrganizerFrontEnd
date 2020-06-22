import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

type DeleteColumnButtonProps = {
  columnId: number;
};

export default function DeleteColumnButton({ columnId }: DeleteColumnButtonProps) {
  return (
    <IconButton color="inherit" onClick={() => console.log("clicked create task ", columnId)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}

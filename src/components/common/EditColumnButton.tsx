import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

type EditColumnButtonProps = {
  columnId: number;
  columnTitle: string;
};

export default function EditColumnButton({ columnId }: EditColumnButtonProps) {
  return (
    <IconButton color="inherit" onClick={() => console.log("clicked create task ", columnId)}>
      <EditIcon fontSize="small" />
    </IconButton>
  );
}

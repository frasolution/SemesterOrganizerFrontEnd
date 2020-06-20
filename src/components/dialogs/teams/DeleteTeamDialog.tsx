import React from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";

import { getToken } from "../../../utils/jwt";
import { TeamsRowData } from "../../../types/types";

type DeleteTeamDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: TeamsRowData;
};

export default function DeleteTeamDialog({ open, setOpen, rowData }: DeleteTeamDialogProps) {
  function closeDialog() {
    setOpen(false);
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(`/api/teams/${rowData.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      });

      if (response.status === 200) {
        closeDialog();
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={closeDialog}
      aria-labelledby="delete-team-dialog-title"
    >
      <DialogTitle id="delete-team-dialog-title">Delete this Team?</DialogTitle>
      <DialogContent>
        <Typography color="textSecondary">
          You are about to delete this team. Do you want to continue?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          No
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

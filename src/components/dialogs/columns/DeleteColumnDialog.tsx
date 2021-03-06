import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";
import { getToken } from "../../../utils/jwt";

type DeleteColumnButtonProps = {
  columnId: string;
};

export default function DeleteColumnButton({ columnId }: DeleteColumnButtonProps) {
  const [open, setOpen] = useState(false);
  const { teamId, courseId } = useParams();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(
        `/api/teams/${teamId}/courses/${courseId}/columns/${columnId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        }
      );

      if (response.status === 200) {
        closeDialog();
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <IconButton color="inherit" onClick={openDialog}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={closeDialog}
        aria-labelledby="delete-columns-dialog-title"
      >
        <DialogTitle id="delete-columns-dialog-title">Delete this Column?</DialogTitle>
        <DialogContent>
          <Typography color="textSecondary">
            You are about to delete this column. Do you want to continue?
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
    </Fragment>
  );
}

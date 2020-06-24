import React, { useState, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  makeStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";

import { getToken } from "../../../utils/jwt";

type DeleteNoteDialogProps = {
  noteId: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.error.main,
  },
}));

export default function DeleteNoteDialog({ noteId }: DeleteNoteDialogProps) {
  const [open, setOpen] = useState(false);
  const { teamId, courseId } = useParams();
  const classes = useStyles();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(
        `/api/teams/${teamId}/courses/${courseId}/notes/${noteId}`,
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
      <IconButton className={classes.button} size="small" onClick={openDialog}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={closeDialog}
        aria-labelledby="delete-note-dialog-title"
      >
        <DialogTitle id="delete-note-dialog-title">Delete this Note?</DialogTitle>
        <DialogContent>
          <Typography color="textSecondary">
            You are about to delete this note. Do you want to continue?
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

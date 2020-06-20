import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { CoursesRowData } from "../../../types/types";
import { getToken } from "../../../utils/jwt";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";

type DeleteCourseDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: CoursesRowData;
};

export default function DeleteCourseDialog({ open, setOpen, rowData }: DeleteCourseDialogProps) {
  const { teamId } = useParams();

  function closeDialog() {
    setOpen(false);
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(`/api/teams/${teamId}/courses/${rowData.id}`, {
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
      aria-labelledby="delete-course-dialog-title"
    >
      <DialogTitle id="delete-course-dialog-title">Delete this Course?</DialogTitle>
      <DialogContent>
        <Typography color="textSecondary">
          You are about to delete this course. Do you want to continue?
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

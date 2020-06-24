import React, { useState, Fragment } from "react";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import Rating from "@material-ui/lab/Rating";
import { useParams } from "react-router-dom";
import { KeyboardDatePicker } from "@material-ui/pickers";
import {
  makeStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Box,
  DialogActions,
  Button,
} from "@material-ui/core";

import { TaskType } from "../../../types/types";
import { getToken } from "../../../utils/jwt";
import { priorityLabels } from "../../../utils/data";

type EditTaskDialogProps = TaskType & { columnId: string };

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
  priority: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  dueDate: {
    marginTop: "8px !important",
  },
  checklist: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function EditTaskDialog(props: EditTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(props.priority !== null ? props.priority : -1);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [priority, setPriority] = useState<number | null>(props.priority);
  const [dueDate, setDueDate] = useState<Date | null>(props.dueDate);
  const { teamId, courseId } = useParams();
  const classes = useStyles();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handleDateChange(date: Date | null) {
    setDueDate(date);
  }

  async function handleEdit() {
    try {
      const body = { title, description, priority, dueDate };
      const response = await axios.patch(
        `/api/teams/${teamId}/courses/${courseId}/columns/${props.columnId}/tasks/${props.id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        }
      );
      closeDialog();
      if (response.status === 200) {
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <IconButton className={classes.button} size="small" onClick={openDialog}>
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={closeDialog}
        aria-labelledby="edit-task-dialog-title"
      >
        <DialogTitle id="edit-task-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              required
              value={title}
              onChange={handleTitleChange}
              name="title"
              label="Title"
              type="text"
              margin="dense"
              autoComplete="off"
              fullWidth
            />
            <TextField
              multiline
              rowsMax={Infinity}
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              label="Description"
              type="text"
              margin="dense"
              autoComplete="off"
              fullWidth
            />
            <KeyboardDatePicker
              className={classes.dueDate}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Due Date"
              value={dueDate}
              fullWidth
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <div className={classes.priority}>
              <label htmlFor="priority-rating">
                <Typography variant="body1" color="textSecondary">
                  Priority:&nbsp;
                </Typography>
              </label>
              <Rating
                id="priority-rating"
                name="hover-feedback"
                value={priority}
                precision={1}
                max={4}
                onChange={(_event, newValue) => {
                  setPriority(newValue);
                }}
                onChangeActive={(_event, newHover) => {
                  setHover(newHover);
                }}
              />
              {priority !== null && (
                <Box ml={2}>
                  <Typography variant="body1" color="textSecondary">
                    {priorityLabels[hover !== -1 ? hover : priority]}
                  </Typography>
                </Box>
              )}
            </div>
          </form>
          <DialogActions>
            <Button onClick={closeDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEdit} color="primary" disabled={!(title.length >= 1)}>
              Edit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

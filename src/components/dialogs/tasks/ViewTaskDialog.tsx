import React, { useState, Fragment } from "react";
import ViewIcon from "@material-ui/icons/Visibility";
import {
  IconButton,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Box,
  DialogActions,
  Button,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Rating from "@material-ui/lab/Rating";

import { TaskType } from "../../../types/types";
import { priorityLabels } from "../../../utils/data";

type ViewTaskDialogProps = TaskType;

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

export default function ViewTaskDialog(props: ViewTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  return (
    <Fragment>
      <IconButton className={classes.button} size="small" onClick={openDialog}>
        <ViewIcon fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={closeDialog}
        aria-labelledby="view-task-dialog-title"
      >
        <DialogTitle id="view-task-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              disabled={true}
              required
              value={props.title}
              name="title"
              label="Title"
              type="text"
              margin="dense"
              autoComplete="off"
              fullWidth
            />
            <TextField
              disabled={true}
              multiline
              rowsMax={Infinity}
              value={props.description}
              name="description"
              label="Description"
              type="text"
              margin="dense"
              autoComplete="off"
              fullWidth
            />
            <KeyboardDatePicker
              disabled={true}
              onChange={() => console.log("")}
              className={classes.dueDate}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Due Date"
              value={props.dueDate}
              fullWidth
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
                disabled={true}
                id="priority-rating"
                name="hover-feedback"
                value={props.priority}
                precision={1}
                max={4}
              />
              {props.priority !== null && (
                <Box ml={2}>
                  <Typography variant="body1" color="textSecondary">
                    {priorityLabels[props.priority]}
                  </Typography>
                </Box>
              )}
            </div>
          </form>
          <DialogActions>
            <Button onClick={closeDialog} color="secondary">
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

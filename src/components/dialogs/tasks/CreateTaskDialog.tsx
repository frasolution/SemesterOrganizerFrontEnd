import React, { Fragment, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import AddIcon from "@material-ui/icons/Add";
import Rating from "@material-ui/lab/Rating";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  makeStyles,
  Box,
  Typography,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

type CreateTaskDialogProps = {
  columnId: number;
};

const priorityLabels: { [index: string]: string } = {
  0: "Very Low",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Very High",
};

const useStyles = makeStyles((theme) => ({
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

export default function CreateTaskDialog({ columnId }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(-1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<number | null>(0);
  const [dueDate, setDueDate] = useState<Date | null>(null);
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

  async function handleSubmit() {
    console.log({ columnId, title, description, priority, dueDate });
  }

  return (
    <Fragment>
      <IconButton color="inherit" onClick={openDialog}>
        <AddIcon fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={closeDialog}
        aria-labelledby="create-task-dialog-title"
      >
        <DialogTitle id="create-task-dialog-title">Create Task</DialogTitle>
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
              required
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            </MuiPickersUtilsProvider>
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
            <Button onClick={handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

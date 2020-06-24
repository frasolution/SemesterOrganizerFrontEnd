import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MoveIcon from "@material-ui/icons/SwapHoriz";
import {
  IconButton,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { getToken } from "../../../utils/jwt";
import { ColumnType, TaskType } from "../../../types/types";

type MoveTaskDialogProps = TaskType & { columnId: string };

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
}));

export default function MoveTaskDialog({
  id,
  columnId,
  title,
  description,
  dueDate,
  priority,
  isCompleted,
}: MoveTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>(columnId);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const { teamId, courseId } = useParams();
  const classes = useStyles();

  async function openDialog() {
    try {
      const response = await axios.get(`/api/teams/${teamId}/courses/${courseId}/columns`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      });
      setColumns(response.data);
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleMoveChange(event: React.ChangeEvent<{ value: unknown }>) {
    setSelectedColumnId(event.target.value as string);
  }

  async function handleMove() {
    try {
      const body = {
        selectedColumnId,
        title,
        description,
        dueDate,
        priority,
        isCompleted,
      };
      const response = await axios.patch(
        `/api/teams/${teamId}/courses/${courseId}/columns/${columnId}/tasks/${id}/move`,
        body,
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
        <MoveIcon fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={closeDialog}
        aria-labelledby="move-task-dialog-title"
      >
        <DialogTitle id="move-task-dialog-title">Move Task</DialogTitle>
        <DialogContent>
          <InputLabel id="move-task-select-label">Column</InputLabel>
          <Select
            fullWidth
            labelId="move-task-select-label"
            id="move-task-select"
            value={selectedColumnId}
            onChange={handleMoveChange}
          >
            {columns.map((column, index) => {
              return (
                <MenuItem key={index} value={column.id}>
                  {column.title}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMove} color="secondary">
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

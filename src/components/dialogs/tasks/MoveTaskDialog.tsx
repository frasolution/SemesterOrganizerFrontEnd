import React, { Fragment, useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { getToken } from "../../../utils/jwt";
import { ColumnType } from "../../../types/types";

type MoveTaskDialogProps = {
  id: number;
  columnId: number;
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
}));

export default function MoveTaskDialog({ id, columnId }: MoveTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<number>(columnId);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const { teamId, courseId } = useParams();
  const classes = useStyles();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleMoveChange(event: React.ChangeEvent<{ value: unknown }>) {
    setSelectedColumnId(event.target.value as number);
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/teams/${teamId}/courses/${courseId}/columns`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          cancelToken: source.token,
        });
        setColumns(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          console.error(error);
        }
      }
    };
    fetchCourses();
    document.title = "Your Modules | FRA UAS Semester Organizer";

    return () => source.cancel();
  }, [open, teamId, courseId]);

  async function handleMove() {
    try {
      const body = { selectedColumnId };
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

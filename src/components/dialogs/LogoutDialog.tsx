import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  makeStyles,
  Typography,
  DialogContent,
} from "@material-ui/core";

import { deleteToken } from "../../utils/jwt";

const useStyles = makeStyles((theme) => ({
  logout: {
    marginLeft: theme.spacing(1),
  },
}));

export default function LogoutDialog() {
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleLogout() {
    deleteToken();
    history.push("/");
  }

  return (
    <div>
      <Button
        variant="text"
        color="inherit"
        onClick={openDialog}
        startIcon={<LogoutIcon />}
        className={classes.logout}
      >
        Logout
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <Typography color="textSecondary">
            You are about to sign out. Do you want to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            No
          </Button>
          <Button onClick={handleLogout} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

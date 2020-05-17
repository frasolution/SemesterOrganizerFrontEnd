import React, { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";

type SignUpDialogProps = {
  className: string;
};

export function SignUpDialog({ className }: SignUpDialogProps) {
  const [isOpen, setOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    resetState();
    setOpen(false);
  }

  function resetState() {
    setFirstname("");
    setLastname("");
    setUsername("");
    setPassword1("");
    setPassword2("");
  }

  function handleFirstnameChange(event: any) {
    setFirstname(event.target.value);
  }

  function handleLastnameChange(event: any) {
    setLastname(event.target.value);
  }

  function handleUsernameChange(event: any) {
    setUsername(event.target.value);
  }

  function handlePassword1Change(event: any) {
    setPassword1(event.target.value);
  }

  function handlePassword2Change(event: any) {
    setPassword2(event.target.value);
  }

  function handleSubmit() {
    console.log(`
      firstname: ${firstname}
      lastname: ${lastname}
      username: ${username}
      password1: ${password1}
      passowrd2 ${password2}
    `);
  }

  return (
    <Fragment>
      <Button variant="contained" color="primary" className={className} onClick={openDialog}>
        Sign Up
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="signup-dialog-title"
      >
        <DialogTitle id="signup-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            fullWidth
            value={firstname}
            onChange={handleFirstnameChange}
            id="signup-firstname"
            label="First Name"
            type="text"
            margin="dense"
            autoComplete="off"
          />
          <TextField
            required
            fullWidth
            value={lastname}
            onChange={handleLastnameChange}
            id="signup-lastname"
            label="Last Name"
            type="text"
            margin="dense"
            autoComplete="off"
          />
          <TextField
            required
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            id="signup-username"
            label="Username"
            type="text"
            margin="dense"
            autoComplete="off"
          />
          <TextField
            required
            fullWidth
            value={password1}
            onChange={handlePassword1Change}
            id="signup-password1"
            label="Password"
            type="password"
            margin="dense"
            autoComplete="off"
          />
          <TextField
            required
            fullWidth
            value={password2}
            onChange={handlePassword2Change}
            id="signup-password2"
            label="Verify Password"
            type="password"
            margin="dense"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

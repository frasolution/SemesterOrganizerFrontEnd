import React, { useState } from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import { validateInput } from "../../../utils/utils";
import { getToken } from "../../../utils/jwt";

type CreateTeamDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateTeamDialog({ open, setOpen }: CreateTeamDialogProps) {
  const [teamName, setTeamName] = useState("");
  const [usernames, setUsernames] = useState([] as string[]);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [errorText, setErrorText] = useState("");

  const teamNameInput = validateInput(teamName.length, 0, 30);
  const usernamesInput = validateInput(usernames.length, 0, 10);

  async function createTeam() {
    try {
      const body = { teamName, usernames };
      const response = await axios.post("/api/teams", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      });
      if (response.status === 201) {
        closeDialog();
        openSuccessSnackbar();
        window.location.reload(false);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorText(error.response.data.message);
        openErrorSnackbar();
      } else {
        setErrorText("There is an internal server error. Come back later!");
        openErrorSnackbar();
      }
    }
  }

  function resetState() {
    setTeamName("");
    setUsernames([]);
    setErrorText("");
    setErrorOpen(false);
  }

  function closeDialog() {
    setOpen(false);
    resetState();
  }

  function openSuccessSnackbar() {
    setSuccessOpen(true);
  }

  function openErrorSnackbar() {
    setErrorOpen(true);
  }

  function handleSnackbarClose(event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
    setErrorOpen(false);
  }

  function handleTeamNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(event.target.value);
  }

  function handleUsernamesChange(chips: string[]) {
    setUsernames(chips);
  }

  function renderTeamNameError() {
    if (teamNameInput.isTooLong) {
      return (
        <Typography variant="caption" color="error">
          Team name is too long
        </Typography>
      );
    } else {
      return null;
    }
  }

  function renderUsernamesError() {
    if (usernamesInput.isTooLong) {
      return (
        <Typography variant="caption" color="error">
          You can have at most 10 team members
        </Typography>
      );
    } else {
      return (
        <Typography variant="caption" color="textSecondary">
          Type the username and press Enter to add a team member
        </Typography>
      );
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={closeDialog}
        aria-labelledby="create-team-dialog-title"
      >
        <DialogTitle id="create-team-dialog-title">Create Team</DialogTitle>
        <DialogContent>
          <TextField
            required
            fullWidth
            value={teamName}
            error={teamNameInput.isTooLong}
            helperText={renderTeamNameError()}
            onChange={handleTeamNameChange}
            name="teamName"
            label="Team Name"
            type="text"
            margin="dense"
            autoComplete="off"
          />
          <ChipInput
            required
            fullWidth
            error={usernamesInput.isTooLong}
            helperText={renderUsernamesError()}
            defaultValue={[]}
            onChange={(chips) => handleUsernamesChange(chips)}
            label="Usernames"
            margin="dense"
          />
          <DialogActions>
            <Button onClick={closeDialog} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={!teamNameInput.isValid || !usernamesInput.isValid}
              onClick={createTeam}
            >
              Create Team
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar open={isSuccessOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert severity="success" elevation={6} variant="filled" onClose={handleSnackbarClose}>
          Created your team successfully! Enjoy organizing :)
        </MuiAlert>
      </Snackbar>
      <Snackbar open={isErrorOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert severity="error" elevation={6} variant="filled" onClose={handleSnackbarClose}>
          {errorText}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  );
}

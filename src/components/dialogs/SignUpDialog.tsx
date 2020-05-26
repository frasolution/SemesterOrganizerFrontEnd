import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";
import MuiAlert from "@material-ui/lab/Alert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Fab,
  makeStyles,
  Theme,
} from "@material-ui/core";

import { SignUpFormValues } from "../../types/types";
import { httpPost } from "../../utils/http-client";
import {
  signUpFormInitialValues,
  signUpFormValidationSchema,
} from "../../utils/form-validation-schemas";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(1),
    minWidth: "8rem",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default function SignUpDialog() {
  const [isOpen, setOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const classes = useStyles();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function openSuccessSnackbar() {
    setSuccessOpen(true);
  }

  function handleSnackbarClose(event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  }

  async function submit(values: SignUpFormValues) {
    try {
      const response = await httpPost("/api/auth/signup", values);
      closeDialog();
      if (response.status === 201) {
        openSuccessSnackbar();
      }
    } catch (error) {
      alert("You can't sign up right now.");
    }
  }

  return (
    <Fragment>
      <Formik
        initialValues={signUpFormInitialValues}
        validationSchema={signUpFormValidationSchema}
        onSubmit={(values: SignUpFormValues) => submit(values)}
      >
        {(formikProps) => {
          const { values, errors, isValid, touched, handleChange, handleBlur } = formikProps;
          return (
            <Fragment>
              <Fab
                size="large"
                variant="extended"
                color="primary"
                className={classes.button}
                onClick={openDialog}
              >
                <PersonAddIcon className={classes.icon} />
                Sign Up
              </Fab>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={isOpen}
                onClose={closeDialog}
                aria-labelledby="signup-dialog-title"
              >
                <DialogTitle id="signup-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                  <Form>
                    <TextField
                      required
                      helperText={errors.firstname && touched.firstname && errors.firstname}
                      error={Boolean(errors.firstname && touched.firstname)}
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstname"
                      label="First Name"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <TextField
                      required
                      helperText={errors.lastname && touched.lastname && errors.lastname}
                      error={Boolean(errors.lastname && touched.lastname)}
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lastname"
                      label="Last Name"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <TextField
                      required
                      helperText={errors.username && touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="username"
                      label="Username"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <TextField
                      required
                      helperText={errors.password && touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      label="Password"
                      type="password"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <TextField
                      required
                      helperText={
                        errors.confirmPassword && touched.confirmPassword && errors.confirmPassword
                      }
                      error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <DialogActions>
                      <Button onClick={closeDialog} color="secondary">
                        Cancel
                      </Button>
                      <Button type="submit" color="primary" disabled={!isValid}>
                        Sign Up
                      </Button>
                    </DialogActions>
                  </Form>
                </DialogContent>
              </Dialog>
            </Fragment>
          );
        }}
      </Formik>
      <Snackbar open={isSuccessOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert severity="success" elevation={6} variant="filled" onClose={handleSnackbarClose}>
          You can now login with your credentials!
        </MuiAlert>
      </Snackbar>
    </Fragment>
  );
}

import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
} from "@material-ui/core";

import { httpPost } from "../../utils/http-client";
import { SignUpFormValues } from "../../types/types";

type SignUpDialogProps = {
  className: string;
};

const initialValues: SignUpFormValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("First name is required")
    .min(1, "Needs more than 1 character")
    .max(30, "Must be 30 characters or less"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(1, "Needs more than 1 character")
    .max(30, "Must be 30 characters or less"),
  username: Yup.string()
    .required("Username is required")
    .min(4, "Needs more than 4 characters")
    .max(20, "Must be 20 characters or less"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Needs more than 8 characters")
    .max(20, "Must be 30 characters or less")
    .matches(passwordRegex, "Password is too weak"),
  confirmPassword: Yup.string()
    .required("Confirm needs to be confirmed")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

export function SignUpDialog(props: SignUpDialogProps) {
  const [isOpen, setOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

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
      if (response.ok) {
        openSuccessSnackbar();
      } else {
        alert("You can't sign up right now.");
      }
    } catch (error) {
      alert("Internal Server Error");
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: SignUpFormValues) => submit(values)}
      >
        {(formikProps) => {
          const { values, errors, isValid, touched, handleChange, handleBlur } = formikProps;
          return (
            <Fragment>
              <Button
                variant="contained"
                color="primary"
                className={props.className}
                onClick={openDialog}
              >
                Sign Up
              </Button>
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

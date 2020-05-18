import React, { useState, Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";

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
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "Password is too weak"),
  confirmPassword: Yup.string()
    .required("Confirm needs to be confirmed")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

export function SignUpDialog(props: SignUpDialogProps) {
  const [isOpen, setOpen] = useState(false);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function submit(values: SignUpFormValues) {
    console.log(values);
  }

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: SignUpFormValues) => submit(values)}
      >
        {(formikProps) => {
          const { values, errors, handleSubmit, handleChange, isValid } = formikProps;
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
                  <form onSubmit={handleSubmit}>
                    <TextField
                      required
                      helperText={errors.firstname}
                      error={Boolean(errors.firstname)}
                      value={values.firstname}
                      onChange={handleChange}
                      name="firstname"
                      label="First Name"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <TextField
                      required
                      helperText={errors.lastname}
                      error={Boolean(errors.lastname)}
                      value={values.lastname}
                      onChange={handleChange}
                      name="lastname"
                      label="Last Name"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <TextField
                      required
                      helperText={errors.username}
                      error={Boolean(errors.username)}
                      value={values.username}
                      onChange={handleChange}
                      name="username"
                      label="Username"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <TextField
                      required
                      helperText={errors.password}
                      error={Boolean(errors.password)}
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      label="Password"
                      type="password"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <TextField
                      required
                      helperText={errors.confirmPassword}
                      error={Boolean(errors.confirmPassword)}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                  </form>
                  <DialogActions>
                    <Button onClick={closeDialog} color="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" disabled={!isValid}>
                      Submit
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
            </Fragment>
          );
        }}
      </Formik>
    </Fragment>
  );
}

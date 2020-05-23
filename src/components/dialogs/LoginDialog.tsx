import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";

import { LoginFormValues } from "../../types/types";
import {
  loginFormInitialValues,
  loginFormValidationSchema,
} from "../../utils/form-validation-schemas";
import { httpPost } from "../../utils/http-client";

type LoginDialogProps = {
  className: string;
};

export default function LoginDialog(props: LoginDialogProps) {
  const [isOpen, setOpen] = useState(false);
  const [isError, setError] = useState(false);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function submit(values: LoginFormValues) {
    try {
      const response = await httpPost("/api/auth/signin", values);
      if (response.ok) {
        console.log(response);
        // TODO: handle token
        // TODO: re-route to teams overview page
      } else {
        setError(true);
      }
    } catch (error) {
      alert("Internal Server Error");
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Formik
        initialValues={loginFormInitialValues}
        validationSchema={loginFormValidationSchema}
        onSubmit={(values: LoginFormValues) => submit(values)}
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
                Login
              </Button>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={isOpen}
                onClose={closeDialog}
                aria-labelledby="login-dialog-title"
              >
                <DialogTitle id="login-dialog-title">Login</DialogTitle>
                <DialogContent>
                  <Form>
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
                    {isError ? (
                      <Typography variant="subtitle2" color="error">
                        Username or password wrong!
                      </Typography>
                    ) : null}
                    <DialogActions>
                      <Button onClick={closeDialog} color="secondary">
                        Cancel
                      </Button>
                      <Button type="submit" color="primary" disabled={!isValid}>
                        Login
                      </Button>
                    </DialogActions>
                  </Form>
                </DialogContent>
              </Dialog>
            </Fragment>
          );
        }}
      </Formik>
    </Fragment>
  );
}

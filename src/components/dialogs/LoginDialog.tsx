import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginIcon from "@material-ui/icons/ExitToApp";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Fab,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Formik, Form } from "formik";

import { LoginFormValues } from "../../types/types";
import {
  loginFormInitialValues,
  loginFormValidationSchema,
} from "../../utils/form-validation-schemas";
import { httpPost } from "../../utils/http-client";
import { setToken } from "../../utils/jwt";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(1),
    minWidth: "8rem",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default function LoginDialog() {
  const [isOpen, setOpen] = useState(false);
  const [isError, setError] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function submit(values: LoginFormValues) {
    try {
      const response = await httpPost("/api/auth/signin", values);
      if (response.status === 201) {
        setToken(response.data.token);
        history.push("/teams");
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <Fragment>
      <Formik
        initialValues={loginFormInitialValues}
        validationSchema={loginFormValidationSchema}
        onSubmit={(values: LoginFormValues, { resetForm }) => {
          submit(values);
          resetForm();
        }}
      >
        {(formikProps) => {
          const {
            values,
            errors,
            isValid,
            touched,
            handleChange,
            handleBlur,
            resetForm,
          } = formikProps;
          return (
            <Fragment>
              <Fab
                size="large"
                variant="extended"
                color="primary"
                className={classes.button}
                onClick={openDialog}
              >
                <LoginIcon className={classes.icon} />
                Login
              </Fab>
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
                      <Button
                        onClick={() => {
                          resetForm();
                          closeDialog();
                        }}
                        color="secondary"
                      >
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

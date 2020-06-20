import React, { Fragment, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
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

import { CreateColumnFormValues } from "../../../types/types";
import {
  createColumnFormInitialValues,
  createColumnFormValidationSchema,
} from "../../../utils/form-validation-schemas";

export default function CreateColumnDialog() {
  const [isOpen, setOpen] = useState(false);
  const [isError, setError] = useState(false);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function submit(values: CreateColumnFormValues) {
    console.log(values);
    alert("Not implemented yet.");
  }

  return (
    <Fragment>
      <Formik
        initialValues={createColumnFormInitialValues}
        validationSchema={createColumnFormValidationSchema}
        onSubmit={(values: CreateColumnFormValues, { resetForm }) => {
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
              <Button variant="text" color="inherit" onClick={openDialog} startIcon={<AddIcon />}>
                Create Column
              </Button>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={isOpen}
                onClose={closeDialog}
                aria-labelledby="create-column-dialog-title"
              >
                <DialogTitle id="create-column-dialog-title">Create Column</DialogTitle>
                <DialogContent>
                  <Form>
                    <TextField
                      required
                      helperText={errors.columnName && touched.columnName && errors.columnName}
                      error={Boolean(errors.columnName && touched.columnName)}
                      value={values.columnName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="username"
                      label="Username"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    {isError ? (
                      <Typography variant="subtitle2" color="error">
                        Column name is wrong
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
                        Create
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

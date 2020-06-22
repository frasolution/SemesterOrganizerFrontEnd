import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Formik, Form } from "formik";

import { getToken } from "../../../utils/jwt";
import { CreateColumnFormValues } from "../../../types/types";
import {
  createColumnFormInitialValues,
  createColumnFormValidationSchema,
} from "../../../utils/form-validation-schemas";

export default function CreateColumnDialog() {
  const [isOpen, setOpen] = useState(false);
  const { teamId, courseId } = useParams();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function submit(values: CreateColumnFormValues) {
    try {
      const response = await axios.post(
        `/api/teams/${teamId}/courses/${courseId}/columns`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        }
      );
      closeDialog();
      if (response.status === 201) {
        window.location.reload(false);
      }
    } catch (error) {
      // TODO: handle error more UX friendly
      console.log(error);
    }
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
                New Column
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
                      name="columnName"
                      label="Column Name"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
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

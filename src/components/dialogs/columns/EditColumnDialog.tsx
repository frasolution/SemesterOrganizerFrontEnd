import React, { Fragment, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import EditIcon from "@material-ui/icons/Edit";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";

import { EditColumnFormValues } from "../../../types/types";
import {
  editColumnFormInitialValues,
  editColumnFormValidationSchema,
} from "../../../utils/form-validation-schemas";
import { getToken } from "../../../utils/jwt";

type EditColumnButtonProps = {
  columnId: number;
  columnTitle: string;
};

export default function EditColumnDialog({ columnId, columnTitle }: EditColumnButtonProps) {
  const [open, setOpen] = useState(false);
  const [isError, setError] = useState(false);
  const { teamId, courseId } = useParams();
  editColumnFormInitialValues.columnName = columnTitle;

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function resetState() {
    setError(false);
    setOpen(false);
  }

  async function submit(values: EditColumnFormValues) {
    try {
      const response = await axios.patch(
        `/api/teams/${teamId}/courses/${courseId}/columns/${columnId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        }
      );
      if (response.status === 200) {
        closeDialog();
        resetState();
        window.location.reload(false);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Formik
        initialValues={editColumnFormInitialValues}
        validationSchema={editColumnFormValidationSchema}
        onSubmit={(values: EditColumnFormValues, { resetForm }) => {
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
              <IconButton color="inherit" onClick={openDialog}>
                <EditIcon fontSize="small" />
              </IconButton>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={closeDialog}
                aria-labelledby="edit-column-dialog-title"
              >
                <DialogTitle id="edit-column-dialog-title">Edit Column</DialogTitle>
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
                        Edit
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

import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";

import { CreateAndUpdateNoteFormValues } from "../../../types/types";
import { getToken } from "../../../utils/jwt";
import {
  createAndUpdateNoteFormInitialValues,
  createAndUpdateNoteFormValidationSchema,
} from "../../../utils/form-validation-schemas";

export default function CreateNotesDialog() {
  const [isOpen, setOpen] = useState(false);
  const { teamId, courseId } = useParams();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function submit(values: CreateAndUpdateNoteFormValues) {
    try {
      const response = await axios.post(`/api/teams/${teamId}/courses/${courseId}/notes`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      });
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
        initialValues={createAndUpdateNoteFormInitialValues}
        validationSchema={createAndUpdateNoteFormValidationSchema}
        onSubmit={(values: CreateAndUpdateNoteFormValues, { resetForm }) => {
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
                New Note
              </Button>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={isOpen}
                onClose={closeDialog}
                aria-labelledby="create-note-dialog-title"
              >
                <DialogTitle id="create-note-dialog-title">Create Note</DialogTitle>
                <DialogContent>
                  <Form>
                    <TextField
                      required
                      helperText={errors.noteTitle && touched.noteTitle && errors.noteTitle}
                      error={Boolean(errors.noteTitle && touched.noteTitle)}
                      value={values.noteTitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="noteTitle"
                      label="Title"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    <TextField
                      required
                      multiline
                      rowsMax={Infinity}
                      helperText={
                        errors.noteDescription && touched.noteDescription && errors.noteDescription
                      }
                      error={Boolean(errors.noteDescription && touched.noteDescription)}
                      value={values.noteDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="noteDescription"
                      label="Description"
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

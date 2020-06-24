import React, { useState, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import EditIcon from "@material-ui/icons/Edit";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import { CreateAndUpdateNoteFormValues } from "../../../types/types";
import { getToken } from "../../../utils/jwt";
import {
  createAndUpdateNoteFormInitialValues,
  createAndUpdateNoteFormValidationSchema,
} from "../../../utils/form-validation-schemas";

type EditNoteDialogProps = {
  noteId: string;
  noteTitle: string;
  noteDescription: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
}));

export default function EditNoteDialog({
  noteId,
  noteTitle,
  noteDescription,
}: EditNoteDialogProps) {
  const [isOpen, setOpen] = useState(false);
  const { teamId, courseId } = useParams();
  const classes = useStyles();

  function setFormInitialValues(title: string, description: string) {
    createAndUpdateNoteFormInitialValues.noteTitle = title;
    createAndUpdateNoteFormInitialValues.noteDescription = description;
  }

  function openDialog() {
    setOpen(true);
    setFormInitialValues(noteTitle, noteDescription);
  }

  function closeDialog() {
    setOpen(false);
    setFormInitialValues("", "");
  }

  async function submit(values: CreateAndUpdateNoteFormValues) {
    try {
      const response = await axios.patch(
        `/api/teams/${teamId}/courses/${courseId}/notes/${noteId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        }
      );
      closeDialog();
      if (response.status === 200) {
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
              <IconButton className={classes.button} size="small" onClick={openDialog}>
                <EditIcon fontSize="small" />
              </IconButton>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={isOpen}
                onClose={closeDialog}
                aria-labelledby="edit-note-dialog-title"
              >
                <DialogTitle id="edit-note-dialog-title">Edit Note</DialogTitle>
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

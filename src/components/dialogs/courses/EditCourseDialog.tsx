import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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

import { EditCourseFormValues, CoursesRowData } from "../../../types/types";
import {
  editCourseFormInitialValues,
  editCourseFormValidationSchema,
} from "../../../utils/form-validation-schemas";
import { getToken } from "../../../utils/jwt";

type EditCourseDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: CoursesRowData;
};

export default function EditCourseDialog({ open, setOpen, rowData }: EditCourseDialogProps) {
  const [isError, setError] = useState(false);
  const { teamId } = useParams();
  editCourseFormInitialValues.courseName = rowData.courseName;

  function closeDialog() {
    setOpen(false);
  }

  function resetState() {
    setError(false);
  }

  async function submit(values: EditCourseFormValues) {
    try {
      const response = await axios.patch(`/api/teams/${teamId}/courses/${rowData.id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      });
      if (response.status === 200) {
        closeDialog();
        resetState();
        window.location.reload(false);
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <Fragment>
      <Formik
        initialValues={editCourseFormInitialValues}
        validationSchema={editCourseFormValidationSchema}
        onSubmit={(values: EditCourseFormValues, { resetForm }) => {
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
              <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={closeDialog}
                aria-labelledby="edit-course-dialog-title"
              >
                <DialogTitle id="edit-course-dialog-title">Edit Course</DialogTitle>
                <DialogContent>
                  <Form>
                    <TextField
                      required
                      helperText={errors.courseName && touched.courseName && errors.courseName}
                      error={Boolean(errors.courseName && touched.courseName)}
                      value={values.courseName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="courseName"
                      label="Course Name"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    {isError ? (
                      <Typography variant="subtitle2" color="error">
                        Course name is wrong
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

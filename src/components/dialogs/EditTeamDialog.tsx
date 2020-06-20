import React, { Fragment, useState } from "react";
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

import { EditTeamFormValues } from "../../types/types";
import {
  editTeamFormInitialValues,
  editTeamFormValidationSchema,
} from "../../utils/form-validation-schemas";
import { getToken } from "../../utils/jwt";

type EditTeamDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: { id: number; name: string; tableData: any };
};

export default function EditTeamDialog({ open, setOpen, rowData }: EditTeamDialogProps) {
  const [isError, setError] = useState(false);
  editTeamFormInitialValues.teamName = rowData.name;

  function closeDialog() {
    setOpen(false);
  }

  function resetState() {
    setError(false);
  }

  async function submit(values: EditTeamFormValues) {
    try {
      const response = await axios.patch(`/api/teams/${rowData.id}`, values, {
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
        initialValues={editTeamFormInitialValues}
        validationSchema={editTeamFormValidationSchema}
        onSubmit={(values: EditTeamFormValues, { resetForm }) => {
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
                aria-labelledby="edit-team-dialog-title"
              >
                <DialogTitle id="edit-team-dialog-title">Edit Team</DialogTitle>
                <DialogContent>
                  <Form>
                    <TextField
                      required
                      helperText={errors.teamName && touched.teamName && errors.teamName}
                      error={Boolean(errors.teamName && touched.teamName)}
                      value={values.teamName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="teamName"
                      label="Team Name"
                      type="text"
                      margin="dense"
                      autoComplete="off"
                      fullWidth
                    />
                    {isError ? (
                      <Typography variant="subtitle2" color="error">
                        Team name is wrong
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

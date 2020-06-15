import React, { Fragment, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import EnterIcon from "@material-ui/icons/SubdirectoryArrowRight";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, Typography } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import LogoutDialog from "../dialogs/LogoutDialog";
import { PageContainer } from "../styled-components";
import { courses } from "../../utils/data";

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.error.main,
  },
  error: {
    margin: "16px",
  },
}));

export default function CoursesPage() {
  const [hasError, setError] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { teamId } = useParams();

  return (
    <Fragment>
      <HeaderBar title="Your Courses">
        <LogoutDialog />
      </HeaderBar>
      <PageContainer>
        <MaterialTable
          columns={[
            { title: "Number", field: "courseNumber" },
            { title: "Title", field: "courseTitle" },
            { title: "CP", field: "courseCP" },
          ]}
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: "Create Course",
              isFreeAction: true,
              onClick: () => console.log("clicked"),
            },
            {
              icon: () => <EnterIcon />,
              tooltip: "Visit Team",
              onClick: (_event, rowData: any) => {
                history.push(`/teams/${teamId}/courses/${rowData.id}/tasks`);
              },
            },
            {
              icon: () => <EditIcon />,
              tooltip: "Edit Team Name",
              onClick: () => alert("Not implemented yet."),
            },
            {
              icon: () => <DeleteIcon className={classes.delete} />,
              tooltip: "Delete Team",
              onClick: () => alert("Not implemented yet."),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            showTitle: false,
            searchFieldAlignment: "left",
          }}
          data={courses}
        />
        {hasError ? (
          <Typography variant="body1" color="error" className={classes.error}>
            Couldn&apos;t fetch your courses.
          </Typography>
        ) : null}
      </PageContainer>
    </Fragment>
  );
}

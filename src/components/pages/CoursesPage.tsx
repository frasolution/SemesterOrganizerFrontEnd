import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import EnterIcon from "@material-ui/icons/SubdirectoryArrowRight";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, Typography } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import LogoutDialog from "../dialogs/LogoutDialog";
import { PageContainer } from "../styled-components";
import { fakeCourses } from "../../utils/data";
import { getToken } from "../../utils/jwt";
import { Course } from "../../types/types";

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.error.main,
  },
  error: {
    margin: "16px",
  },
}));

export default function CoursesPage() {
  const [courses, setCourses] = useState([] as Course[]);
  const [hasError, setError] = useState(false);
  const { teamId } = useParams();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/teams/${teamId}/courses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          cancelToken: source.token,
        });
        // TODO: delete log later
        console.log("Courses response is: ", response.data);
        setCourses(fakeCourses);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          setError(true);
        }
      }
    };
    fetchCourses();
    document.title = "Your Courses | FRA UAS Semester Organizer";

    return () => source.cancel();
  }, [teamId]);

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
              tooltip: "Visit Tasks",
              onClick: (_event, rowData: any) => {
                history.push(`/teams/${teamId}/courses/${rowData.id}/tasks`);
              },
            },
            {
              icon: () => <DeleteIcon className={classes.delete} />,
              tooltip: "Delete Course",
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

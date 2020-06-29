import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import EnterIcon from "@material-ui/icons/SubdirectoryArrowRight";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import NoteIcon from "@material-ui/icons/Note";
import { makeStyles, Typography, Breadcrumbs, Link } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import LogoutDialog from "../dialogs/LogoutDialog";
import CreateCourseDialog from "../dialogs/courses/CreateCourseDialog";
import DeleteCourseDialog from "../dialogs/courses/DeleteCourseDialog";
import EditCourseDialog from "../dialogs/courses/EditCourseDialog";
import { PageContainer } from "../styled-components";
import { getToken } from "../../utils/jwt";
import { Course } from "../../types/types";

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.error.main,
  },
  root: {
    margin: "16px",
  },
  link: {
    cursor: "pointer",
  },
}));

export default function CoursesPage() {
  const [courses, setCourses] = useState([] as Course[]);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<any>({});
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
        setCourses(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          setError(true);
        }
      }
    };
    fetchCourses();
    document.title = "Your Modules | FRA UAS Semester Organizer";

    return () => source.cancel();
  }, [teamId]);

  return (
    <Fragment>
      <HeaderBar title="Your Modules">
        <LogoutDialog />
      </HeaderBar>
      <PageContainer>
        <CreateCourseDialog open={isCreateDialogOpen} setOpen={setCreateDialogOpen} />
        <EditCourseDialog
          open={isEditDialogOpen}
          setOpen={setEditDialogOpen}
          rowData={currentRow}
        />
        <DeleteCourseDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          rowData={currentRow}
        />
        <Breadcrumbs className={classes.root} aria-label="breadcrumb">
          <Link color="inherit" className={classes.link} onClick={() => history.push("/teams")}>
            Teams
          </Link>
          <Link color="textPrimary" className={classes.link} aria-current="page">
            Modules
          </Link>
        </Breadcrumbs>
        <MaterialTable
          columns={[
            { title: "Module Number", field: "courseNumber" },
            { title: "Module Name", field: "courseName" },
            { title: "Semester", field: "courseSemester" },
            { title: "CP", field: "courseCP" },
          ]}
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: "Add Modules",
              isFreeAction: true,
              onClick: () => setCreateDialogOpen(true),
            },
            {
              icon: () => <EnterIcon />,
              tooltip: "Visit Tasks",
              onClick: (_event, rowData: any) => {
                console.log(rowData);
                history.push(`/teams/${teamId}/courses/${rowData.id}/tasks`, {
                  courseName: rowData.courseName,
                });
              },
            },
            {
              icon: () => <NoteIcon />,
              tooltip: "Visit Notes",
              onClick: (_event, rowData: any) => {
                history.push(`/teams/${teamId}/courses/${rowData.id}/notes`, {
                  courseName: rowData.courseName,
                });
              },
            },
            {
              icon: () => <EditIcon />,
              tooltip: "Edit Course Name",
              onClick: (_event, rowData: any) => {
                setCurrentRow(rowData);
                setEditDialogOpen(true);
              },
            },
            {
              icon: () => <DeleteIcon className={classes.delete} />,
              tooltip: "Delete Course",
              onClick: (_event, rowData: any) => {
                setCurrentRow(rowData);
                setDeleteDialogOpen(true);
              },
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
          <Typography variant="body1" color="error" className={classes.root}>
            Couldn&apos;t fetch your courses.
          </Typography>
        ) : null}
      </PageContainer>
    </Fragment>
  );
}

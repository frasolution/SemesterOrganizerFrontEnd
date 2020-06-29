import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Typography, makeStyles, Breadcrumbs, Link, CircularProgress } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import Column from "../common/Column";
import Task from "../common/Task";
import LogoutDialog from "../dialogs/LogoutDialog";
import CreateColumnDialog from "../dialogs/columns/CreateColumnDialog";
import { getToken } from "../../utils/jwt";
import { ColumnType } from "../../types/types";
import { FlexContainer } from "../styled-components";

const useStyles = makeStyles(() => ({
  root: {
    margin: "16px",
  },
  link: {
    cursor: "pointer",
  },
}));

export default function TasksPage() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { teamId, courseId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const { courseName } = history.location.state as any;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/teams/${teamId}/courses/${courseId}/columns`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          cancelToken: source.token,
        });
        setLoading(false);
        setColumns(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          setError(true);
        }
      }
    };
    fetchTasks();
    document.title = `Your Tasks for ${courseName} | FRA UAS Semester Organizer`;

    return () => source.cancel();
  }, [teamId, courseId, courseName]);

  return (
    <Fragment>
      <HeaderBar title={`Your Tasks for ${courseName}`}>
        <CreateColumnDialog />
        <LogoutDialog />
      </HeaderBar>
      <Breadcrumbs className={classes.root} aria-label="breadcrumb">
        <Link color="inherit" className={classes.link} onClick={() => history.push("/teams")}>
          Teams
        </Link>
        <Link
          color="inherit"
          className={classes.link}
          onClick={() => history.push(`/teams/${teamId}/courses/`)}
        >
          Modules
        </Link>
        <Link color="textPrimary" className={classes.link} aria-current="page">
          Tasks
        </Link>
      </Breadcrumbs>
      <FlexContainer>
        {columns
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .map((column, index) => {
            return (
              <Column key={index} id={column.id} title={column.title}>
                {column.tasks.map((task, idx) => {
                  const { id, title, description, dueDate, priority, isCompleted } = task;
                  return (
                    <Task
                      key={idx}
                      columnId={column.id}
                      id={id}
                      title={title}
                      description={description}
                      dueDate={dueDate}
                      priority={priority}
                      isCompleted={isCompleted}
                    />
                  );
                })}
              </Column>
            );
          })}
        {isLoading ? <CircularProgress /> : null}
        {columns.length === 0 && !isLoading ? (
          <Typography variant="body1" color="textPrimary" className={classes.root}>
            No records to fetch. Create a column to start organizing your tasks!
          </Typography>
        ) : null}
        {isError ? (
          <Typography variant="body1" color="error" className={classes.root}>
            Couldn&apos;t fetch columns.
          </Typography>
        ) : null}
      </FlexContainer>
    </Fragment>
  );
}

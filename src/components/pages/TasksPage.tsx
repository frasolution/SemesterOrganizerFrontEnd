import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import Column from "../common/Column";
import Task from "../common/Task";
import LogoutDialog from "../dialogs/LogoutDialog";
import CreateColumnDialog from "../dialogs/columns/CreateColumnDialog";
import { getToken } from "../../utils/jwt";
import { ColumnType } from "../../types/types";
import { FlexContainer } from "../styled-components";

const useStyles = makeStyles(() => ({
  error: {
    margin: "16px",
  },
}));

export default function TasksPage() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [isError, setError] = useState(false);
  const { teamId, courseId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/teams/${teamId}/courses/${courseId}/columns`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          cancelToken: source.token,
        });
        setColumns(response.data);
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
  }, [teamId, courseId]);

  return (
    <Fragment>
      <HeaderBar title="Your Tasks">
        <CreateColumnDialog />
        <LogoutDialog />
      </HeaderBar>
      <FlexContainer>
        {columns.map((column, index) => {
          return (
            <Column key={index} id={column.id} title={column.title}>
              {column.tasks.map((task, idx) => {
                const { id, title, description, dueDate, priority, isCompleted } = task;
                return (
                  <Task
                    key={idx}
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
        {isError ? (
          <Typography variant="body1" color="error" className={classes.error}>
            Couldn&apos;t fetch columns.
          </Typography>
        ) : null}
      </FlexContainer>
    </Fragment>
  );
}

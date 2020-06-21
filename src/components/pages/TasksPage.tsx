import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HeaderBar from "../common/HeaderBar";
import Column from "../common/Column";
import LogoutDialog from "../dialogs/LogoutDialog";
import CreateColumnDialog from "../dialogs/tasks/CreateColumnDialog";
import { getToken } from "../../utils/jwt";
import { ColumnType } from "../../types/types";
import { FlexContainer } from "../styled-components";
import { Card, CardContent, Typography, CardActions, makeStyles } from "@material-ui/core";

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
              <div style={{ padding: "16px" }}>
                <Card elevation={8}>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component={"p"}>
                      {column.title}
                    </Typography>
                  </CardContent>
                  <CardActions>actions</CardActions>
                </Card>
              </div>
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

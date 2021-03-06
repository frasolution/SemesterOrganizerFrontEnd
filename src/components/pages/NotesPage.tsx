import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumbs, Link, makeStyles, Typography, CircularProgress } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

import Note from "../common/Note";
import HeaderBar from "../common/HeaderBar";
import LogoutDialog from "../dialogs/LogoutDialog";
import CreateNoteDialog from "../dialogs/notes/CreateNoteDialog";
import { NotesContainer } from "../styled-components";
import { getToken } from "../../utils/jwt";
import { NoteType } from "../../types/types";

const useStyles = makeStyles(() => ({
  root: {
    margin: "16px",
  },
  link: {
    cursor: "pointer",
  },
}));

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const { teamId, courseId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const { courseName } = history.location.state as any;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/teams/${teamId}/courses/${courseId}/notes`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          cancelToken: source.token,
        });
        setLoading(false);
        setNotes(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          setError(true);
        }
      }
    };
    fetchNotes();
    document.title = `Your Notes for ${courseName} | FRA UAS Semester Organizer`;

    return () => source.cancel();
  }, [teamId, courseId, courseName]);

  return (
    <Fragment>
      <HeaderBar title={`Your Notes for ${courseName}`}>
        <CreateNoteDialog />
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
          Notes
        </Link>
      </Breadcrumbs>
      <NotesContainer>
        {notes.map((note, index) => {
          const { id, title, description } = note;
          return <Note key={index} noteId={id} noteTitle={title} noteDescription={description} />;
        })}
        {isLoading ? <CircularProgress /> : null}
        {notes.length === 0 && !isLoading ? (
          <Typography variant="body1" color="textPrimary" className={classes.root}>
            No records to fetch. Create notes to start collecting your thoughts!
          </Typography>
        ) : null}
        {isError ? (
          <Typography variant="body1" color="error" className={classes.root}>
            Couldn&apos;t fetch notes.
          </Typography>
        ) : null}
      </NotesContainer>
    </Fragment>
  );
}

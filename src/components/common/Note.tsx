import React from "react";
import EditNoteDialog from "../dialogs/notes/EditNoteDialog";
import DeleteNoteDialog from "../dialogs/notes/DeleteNoteDialog";
import { CardContainer, CardText } from "../styled-components";
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  makeStyles,
} from "@material-ui/core";

type NoteProps = {
  noteId: string;
  noteTitle: string;
  noteDescription: string;
};

const useStyles = makeStyles(() => ({
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  noteContent: {
    whiteSpace: "pre-line",
  },
}));

export default function Note({ noteId, noteTitle, noteDescription }: NoteProps) {
  const classes = useStyles();

  return (
    <CardContainer>
      <Card elevation={8}>
        <CardHeader
          title={
            <Typography variant="h6" color="textPrimary">
              {noteTitle}
            </Typography>
          }
        />
        <CardContent>
          <Typography
            className={classes.noteContent}
            variant="body1"
            color="textSecondary"
            component={"span"}
          >
            <CardText>{noteDescription}</CardText>
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          <EditNoteDialog noteId={noteId} noteTitle={noteTitle} noteDescription={noteDescription} />
          <DeleteNoteDialog noteId={noteId} />
        </CardActions>
      </Card>
    </CardContainer>
  );
}

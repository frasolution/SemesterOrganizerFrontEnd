import React from "react";
import { CardContainer } from "../styled-components";
import { Card, CardHeader, Typography, CardContent } from "@material-ui/core";

type NoteProps = {
  noteId: string;
  noteTitle: string;
  noteDescription: string;
};

export default function Note({ noteId, noteTitle, noteDescription }: NoteProps) {
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
          <Typography variant="body1" color="textSecondary" component={"p"}>
            {noteDescription}
          </Typography>
        </CardContent>
      </Card>
    </CardContainer>
  );
}

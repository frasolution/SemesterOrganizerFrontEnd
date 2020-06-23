import React from "react";
import { makeStyles, CardHeader, Typography } from "@material-ui/core";

import CreateTaskDialog from "../dialogs/tasks/CreateTaskDialog";
import EditColumnDialog from "../dialogs/columns/EditColumnDialog";
import DeleteColumnDialog from "../dialogs/columns/DeleteColumnDialog";

type ColumnHeaderProps = {
  id: number;
  title: string;
};

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
}));

export default function ColumnHeader(props: ColumnHeaderProps) {
  const { id, title } = props;
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.header}
      title={<Typography variant="subtitle2">{title}</Typography>}
      action={
        <div>
          <CreateTaskDialog columnId={id} />
          <EditColumnDialog columnId={id} columnTitle={title} />
          <DeleteColumnDialog columnId={id} />
        </div>
      }
    />
  );
}

import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

type HeaderBarProps = { title: string };

export const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          {props.children}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderBar;

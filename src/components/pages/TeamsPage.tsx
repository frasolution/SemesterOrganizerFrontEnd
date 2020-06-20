import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import EnterIcon from "@material-ui/icons/SubdirectoryArrowRight";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";

import HeaderBar from "../common/HeaderBar";
import CreateTeamDialog from "../dialogs/CreateTeamDialog";
import EditTeamDialog from "../dialogs/EditTeamDialog";
import DeleteTeamDialog from "../dialogs/DeleteTeamDialog";
import LogoutDialog from "../dialogs/LogoutDialog";
import { PageContainer } from "../styled-components";
import { getToken } from "../../utils/jwt";
import { Team } from "../../types/types";

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.error.main,
  },
  error: {
    margin: "16px",
  },
}));

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<any>({});
  const [hasError, setError] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          cancelToken: source.token,
        });
        setTeams(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          setError(true);
        }
      }
    };
    fetchTeams();
    document.title = "Your Teams | FRA UAS Semester Organizer";

    return () => source.cancel();
  }, []);

  return (
    <Fragment>
      <HeaderBar title="Your Teams">
        <LogoutDialog />
      </HeaderBar>
      <PageContainer>
        <CreateTeamDialog open={isCreateDialogOpen} setOpen={setCreateDialogOpen} />
        <EditTeamDialog open={isEditDialogOpen} setOpen={setEditDialogOpen} rowData={currentRow} />
        <DeleteTeamDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          rowData={currentRow}
        />
        <MaterialTable
          columns={[{ title: "Team", field: "name" }]}
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: "Create Team",
              isFreeAction: true,
              onClick: () => setCreateDialogOpen(true),
            },
            {
              icon: () => <EnterIcon />,
              tooltip: "Visit Team",
              onClick: (_event, rowData: any) => {
                history.push(`/teams/${rowData.id}/courses`);
              },
            },
            {
              icon: () => <EditIcon />,
              tooltip: "Edit Team Name",
              onClick: (_event, rowData: any) => {
                setCurrentRow(rowData);
                setEditDialogOpen(true);
              },
            },
            {
              icon: () => <DeleteIcon className={classes.delete} />,
              tooltip: "Delete Team",
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
          data={teams}
        />
        {hasError ? (
          <Typography variant="body1" color="error" className={classes.error}>
            Couldn&apos;t fetch your teams.
          </Typography>
        ) : null}
      </PageContainer>
    </Fragment>
  );
}

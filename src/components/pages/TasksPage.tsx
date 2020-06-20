import React, { Fragment } from "react";

import HeaderBar from "../common/HeaderBar";
import LogoutDialog from "../dialogs/LogoutDialog";
import CreateColumnDialog from "../dialogs/tasks/CreateColumnDialog";

export default function TasksPage() {
  return (
    <Fragment>
      <HeaderBar title="Your Tasks">
        <CreateColumnDialog />
        <LogoutDialog />
      </HeaderBar>
    </Fragment>
  );
}

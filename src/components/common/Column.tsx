import React from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";

import { ColumnContainerStyles } from "../styled-components";
import ColumnHeader from "./ColumnHeader";

type ColumnProps = {
  id: number;
  title: string;
};

const ColumnContainer = styled(Card)`
  ${ColumnContainerStyles}
`;

export const Column: React.FC<ColumnProps> = (props) => {
  return (
    <ColumnContainer elevation={8}>
      <ColumnHeader id={props.id} title={props.title} />
      {props.children}
    </ColumnContainer>
  );
};

export default Column;

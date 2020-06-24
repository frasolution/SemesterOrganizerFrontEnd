import styled, { css } from "styled-components";

export const PageContainer = styled.div`
  height: 100%;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const CardContainer = styled.div`
  padding: 16px;
`;

export const ColumnContainerStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 25rem;
  margin: 16px;
`;

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

export const NoteContainer = styled.div`
  padding: 16px;
  max-width: 32em;
`;

export const CardText = styled.p`
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`;

export const ColumnContainerStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 25rem;
  margin: 16px;
`;

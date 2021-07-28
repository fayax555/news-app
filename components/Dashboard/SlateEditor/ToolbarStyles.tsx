import styled, { css } from 'styled-components';

export const ToolbarWrap = styled.div`
  padding-top: 0.2rem;
  background-color: #ddd;
`;

const active = (color: string, bgColor: string) => css`
  color: ${color};
  background-color: ${bgColor};
`;

export const Icon = styled.i<{ active: boolean }>`
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0.5rem;
  padding: 0.2rem 0.2rem 0rem 0.2rem;

  label {
    cursor: pointer;
  }

  ${(props) =>
    props.active ? active('#1a73e8', '#adabab83') : active('#444', '#ddd')};

  &:hover {
    background-color: #bbb;
  }
`;

import styled from 'styled-components';

// List
export const ArticleBar = styled.div`
  padding: 0.75rem;
  margin: 0.5rem 0;
  background-color: #aaa;
  display: flex;
  gap: 1rem;
  justify-content: space-around;

  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

// Table
export const Table = styled.section`
  display: grid;
  justify-content: center;
  font-size: 1.2rem;

  li {
    padding: 0.5rem;
  }

  > ul:first-child,
  div > ul {
    display: grid;
    grid-template-columns: 0.4fr 3fr 1.2fr 1.2fr 1fr;
    justify-items: start;

    li:first-child {
      justify-self: end;

      input {
        width: 1.3rem;
        height: 1.3rem;
        margin-top: 0.5rem;
      }
    }
  }
`;

// TableField
export const StyledLink = styled.a`
  color: #1d1d97;

  &:hover {
    color: #7070f3;
  }
`;

export const IconsWrap = styled.div<{ c1: string; c2: string; c3?: string }>`
  display: none;
  position: absolute;

  > * {
    margin: 0.5rem 1rem;
    font-size: 1.3rem;
    cursor: pointer;

    &:first-child:hover {
      color: ${(props) => props.c1};
    }

    &:nth-child(2):hover {
      color: ${(props) => props.c2};
    }

    &:nth-child(3):hover {
      color: ${(props) => props.c3};
    }
  }
`;

export const TableBodyField = styled.ul`
  border-bottom: 1px dashed #777;
  padding-bottom: 2rem;

  &:hover {
    li:nth-child(2) > div {
      display: flex;
    }
  }

  li:last-child div {
    position: absolute;
  }
`;

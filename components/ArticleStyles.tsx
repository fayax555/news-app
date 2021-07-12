import styled from 'styled-components';

// ArticleList
export const ArticleListWrap = styled.div`
  display: flex;
  padding: 3rem;

  > div {
    width: 300px;
    background-color: #f4f4f4;
    margin: 1rem;
    padding: 1rem;

    &:hover {
      outline: 1px solid #1b47a5;
    }
  }

  a {
    font-size: 1.4rem;
    font-weight: bold;
  }

  p {
    padding-top: 1rem;
  }

  > div > div {
    cursor: pointer;
  }
`;

// Article
export const ArticleWrap = styled.div`
  padding-top: 2rem;
  width: 600px;

  h2 {
    padding-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
  }
`;

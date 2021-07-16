import styled from 'styled-components';

// ArticleList
export const ArticleListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  padding-top: 4rem;
  max-width: 600px;

  p {
    font-size: 1.1rem;
  }
`;

// news pages
export const NewsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  h1:hover,
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  div {
    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  }
`;

export const NewsBtnWrap = styled.div`
  display: flex;
  transform: translateX(282px);
`;

//write.tsx
export const FormWrap = styled.div`
  padding-top: 2rem;

  h1 {
    text-align: center;
  }

  form {
    padding: 0.5rem;

    div {
      padding: 0.5rem;
    }

    label {
      display: block;
      font-size: 1.2rem;
      padding-bottom: 0.5rem;
    }

    input,
    textarea {
      padding: 0.5rem;
      width: 100%;
      font-size: 1.1rem;
      border: 1px solid #888;
      border-radius: 5px;
    }

    button {
      padding: 0.5rem 1rem;
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
`;

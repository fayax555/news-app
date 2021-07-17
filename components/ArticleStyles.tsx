import styled from 'styled-components';

// news pages
export const NewsWrap = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
  
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

// ArticleList
export const ArticleListWrap = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  > a {
    width: 300px;
    height: 150px;
    background-color: #f4f4f4;
    margin: 1rem;
    padding: 1.25rem;

    h2 {
      font-size: 1.3rem;
      padding-bottom: 0.5rem;
    }

    &:hover {
      outline: 1px solid #1b47a5;
      cursor: pointer;
    }
  }

  > div > div {
    cursor: pointer;
  } */
`;

// Article
export const ArticleWrap = styled.div`
  padding-top: 4rem;
  max-width: 600px;

  p {
    font-size: 1.1rem;
  }
`;

export const NewsBtnWrap = styled.div`
  display: flex;
  transform: translateX(282px);

  @media (max-width: 818px) {
    transform: none;
  }
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

import styled from 'styled-components';

// news pages
export const NewsWrap = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 2rem;
`;

// Article
export const ArticleWrap = styled.div`
  padding-top: 4rem;
  max-width: 760px;

  h1 {
    line-height: 1.2;
    font-size: 2.2rem;
    padding-bottom: 2rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  p {
    font-size: 1.15rem;
    max-width: 670px;
    margin-bottom: -0.5rem;

    &:empty:before {
      content: ' ';
      white-space: pre;
    }

    /* span.underlineStyle {
      padding-right: 5px;
      display: inline-block;
    } */
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

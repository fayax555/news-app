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

  h3 {
    font-size: 1.2rem;
  }

  div {
    padding: 1rem 0;
  }

  p {
    font-size: 1.15rem;
    max-width: 670px;
    margin-bottom: -0.5rem;
  }

  p:empty:before,
  strong:empty:before,
  em:empty:before,
  u:empty:before,
  h2:empty:before,
  h3:empty:before {
    content: ' ';
    white-space: pre;
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

// Header.tsx

export const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
`;

export const HeaderLeft = styled.div`
  h1 {
    font-size: 1.5rem;
  }

  > a {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
    padding-top: 2rem;

    &:hover {
      text-decoration: underline;

      img {
        opacity: 0.8;
      }
    }

    h2 {
      font-size: 1rem;
      line-height: 1.4;
      color: #444;
    }
  }
`;

export const LinkWrap = styled.a`
  position: relative;

  &:hover {
    img {
      opacity: 0.9;
    }

    h1 {
      text-decoration: underline;
    }
  }

  > * {
    position: absolute;
    z-index: 10;
  }

  > div {
    bottom: 0;
    padding: 0.2rem 0.5rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

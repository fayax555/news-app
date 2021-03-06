import styled from 'styled-components';
import { max_width } from '../Styles';

// news pages
export const NewsWrap = styled.div`
  ${max_width};
  margin: auto;
  padding: 2rem;
`;

// Article
export const ArticleWrap = styled.div`
  max-width: 760px;

  > h1 {
    line-height: 1.2;
    font-size: 2.2rem;
    padding-bottom: 1.5rem;
  }

  > h2 {
    font-size: 1.6rem;
  }

  > h3 {
    font-size: 1.2rem;
  }

  > div {
    padding: 1rem 0;
  }

  p {
    font-size: 1.15rem;
    max-width: 670px;
    margin-bottom: -0.25rem;
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

export const ContentImage = styled.section`
  padding-bottom: 0rem;
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
export const HeaderWrap = styled.section`
  display: flex;
  justify-content: space-around;
  gap: 2.1rem;
`;

export const HeaderLeft = styled.section`
  padding-right: 0.75rem;
  max-width: 400px;

  h1 {
    font-size: 1.5rem;
  }

  > a {
    display: flex;
    gap: 1rem;
    padding-top: 1.85rem;

    div:first-child {
      height: 80px;
      width: 90px;
    }

    div:nth-child(2) {
      display: grid;
      grid-template-columns: 1fr;

      p:nth-child(2) {
        display: none;
      }
    }

    &:hover {
      img {
        opacity: 0.8;
      }
    }

    h2 {
      font-size: 0.9rem;
      line-height: 1.4;
      color: #444;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const LinkWrap = styled.a`
  > div {
    position: relative;
    padding-top: 1.55rem;

    > div {
      width: 100%;
      max-height: 480px;
      position: absolute;
      bottom: 10px;
      background-color: rgba(0, 0, 0, 0.75);
      padding: 0.75rem 1rem;
      margin-bottom: 0.5rem;
      color: #fff;

      > h1 {
        font-size: clamp(0.8rem, 2.5vw, 1.75rem);
        line-height: 1.4;
        padding-bottom: 0.5rem;
      }

      > p {
        font-size: clamp(0.6rem, 2vw, 1rem);
      }
    }
  }

  &:hover {
    img {
      opacity: 0.9;
    }

    h1 {
      text-decoration: underline;
    }
  }
`;

import styled from 'styled-components';

// pages/admin/dashboard
export const EditorFormWrap = styled.section`
  background-color: #f3f3f3;
  min-height: 100vh;
`;

// pages/admin/dashboard
export const EditorForm = styled.form`
  max-width: 750px;
  padding: 1rem;
  margin: auto;
  display: flex;

  .filepond--panel-root {
    background-color: #ccc;
  }

  .filepond--label-action {
    text-decoration-color: #555;
  }

  > div:first-child {
    min-width: 670px;
    max-width: 670px;
    padding: 1rem 1rem;
    width: 100%;

    input {
      width: 100%;
      font-size: 1.2rem;
      display: block;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
  }

  button {
    margin-left: 2rem;
    margin-top: 3.6rem;
  }
`;

// components/Dashboard/Navbar
export const NavbarWrap = styled.section`
  background-color: #222;
  color: #f4f4f4;
  display: inline-block;
  font-weight: 600;
  min-height: 94.5vh;

  a {
    display: inline-block;
  }

  h3 {
    padding: 1rem;
    padding-left: 1.5rem;
  }
`;

export const List = styled.ul`
  > li {
    transition-duration: 0.5s;
    padding: 0.5rem 0;

    a {
      padding: 0 1.5rem;
      display: inline-block;
    }

    > ul {
      display: none;
      font-size: 0.9rem;
      background-color: #444;
    }

    &:hover > ul {
      display: block;

      li {
        a {
          padding: 0.25rem 1.75rem;
          opacity: 0.5;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
`;

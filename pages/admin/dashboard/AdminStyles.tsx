import styled from "styled-components";

export const EditorFormWrap = styled.section`
  background-color: #f3f3f3;
  min-height: 100vh;
`;

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
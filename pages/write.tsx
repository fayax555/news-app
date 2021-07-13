import { FC, useRef } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

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

interface Props {}

const Write: FC<Props> = () => {
  const titleInputRef = useRef<any>();
  const bodyInputRef = useRef<any>();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const enteredTitle = titleInputRef.current.value;
  };

  return (
    <Wrap>
      <h1>Write</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input id='title' type='text' ref={titleInputRef} required/>
        </div>
        <div>
          <label htmlFor='body'>Body</label>
          <textarea id='body' cols={65} rows={15} ref={bodyInputRef} required></textarea>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </Wrap>
  );
};

export default Write;

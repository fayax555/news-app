import { FC, FormEventHandler, useRef, useState } from 'react';
import { Descendant } from 'slate';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Layout from 'components/Layout/Layout';
import { Button } from 'components/Styles/Styles';
import FilePondComponent from 'components/Dashboard/FilePond';
import { FilePond, registerPlugin } from 'filepond';

const EditorFormWrap = styled.section`
  background-color: #f3f3f3;
  min-height: 100vh;
`;

const EditorForm = styled.form`
  max-width: 750px;
  padding: 1rem;
  margin: auto;
  display: flex;

  > div:first-child {
    min-width: 670px;
    max-width: 670px;
    padding: 1rem 0;
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

const SlateEditor = dynamic(
  () => import('components/Dashboard/SlateEditor/SlateEditor'),
  { ssr: false }
);

const IndexPage: FC = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  // cover image from filepond
  const [files, setFiles] = useState<any[]>([]);
  // value contains the text inside the slte editor
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsSubmit(true);

    const inputTitle = titleInputRef.current!.value;

    const {
      getFileEncodeBase64String,
      file: { name, size, type },
    } = files[0];

    const reqBody = {
      headline: inputTitle,
      content: value,
      coverImage: {
        name,
        size,
        type,
        encodeData: getFileEncodeBase64String(),
      },
    };

    fetch('/api/articles', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <Layout title='Add New Article'>
      <EditorFormWrap>
        <EditorForm onSubmit={handleSubmit}>
          <div>
            <h2>Add New Article</h2>
            <input
              ref={titleInputRef}
              type='text'
              placeholder='Enter title here'
              required
            />
            <FilePondComponent files={files} setFiles={setFiles} />
            <SlateEditor value={value} setValue={setValue} />
          </div>
          <div>
            <Button isSubmit={isSubmit} disabled={isSubmit} type='submit'>
              Publish
            </Button>
          </div>
        </EditorForm>
      </EditorFormWrap>
    </Layout>
  );
};

export default IndexPage;

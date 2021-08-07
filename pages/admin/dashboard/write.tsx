import { FC, FormEventHandler, useRef, useState } from 'react';
import { Descendant } from 'slate';
import dynamic from 'next/dynamic';
import Layout from 'components/Layout/Layout';
import { Button } from 'components/Styles/Styles';
import FilePondComponent from 'components/Dashboard/FilePond';
import { EditorForm, EditorFormWrap } from './AdminStyles';

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

  // console.log(value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsSubmit(true);
    console.log('submit button clicked');

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

  try {
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
              <Button
                fs='1rem'
                isSubmit={isSubmit}
                disabled={false}
                type='submit'
              >
                Publish
              </Button>
            </div>
          </EditorForm>
        </EditorFormWrap>
      </Layout>
    );
  } catch (error) {
    console.error(error);
  }
  return null;
};

export default IndexPage;

import { FC, FormEventHandler, useRef, useState } from 'react';
import { Descendant } from 'slate';
import dynamic from 'next/dynamic';
import Layout from 'components/Layout/Layout';
import { Button } from 'components/Styles/Styles';
import FilePondComponent from 'components/Dashboard/Articles/Editor/FilePond';
import { DashboardWrite, EditorForm } from 'components/Styles/DashboardStyles';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import { GetServerSideProps } from 'next';

const SlateEditor = dynamic(
  () => import('components/Dashboard/Articles/Editor/SlateEditor'),
  { ssr: false }
);

const IndexPage: FC<{ _id?: string }> = ({ _id }) => {
  const headlineRef = useRef<HTMLInputElement>(null);
  const imageCaptionRef = useRef<HTMLInputElement>(null);
  const excerptRef = useRef<HTMLInputElement>(null);

  console.log(_id);

  // cover image from filepond
  const [files, setFiles] = useState<
    {
      getFileEncodeBase64String: () => string;
      filenameWithoutExtension: string;
      file: { size: number; type: string };
    }[]
  >([]);
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
    console.log('submit button clicked');

    const headline = headlineRef.current!.value;
    const imageCaption = imageCaptionRef.current!.value;
    const excerpt = excerptRef.current!.value;

    const {
      getFileEncodeBase64String,
      file: { size, type },
      filenameWithoutExtension,
    } = files[0];

    const reqBody = {
      headline,
      imageCaption,
      excerpt,
      content: value,
      coverImage: {
        name: filenameWithoutExtension,
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
      .then((data) => alert(data.message));
  };

  return (
    <Layout title='Add New Article'>
      <DashboardWrite>
        <Navbar />
        <div>
          <h2>Add New Article</h2>
          <EditorForm onSubmit={handleSubmit}>
            <div>
              <input
                ref={headlineRef}
                type='text'
                placeholder='Headline'
                required
              />
              <FilePondComponent files={files} setFiles={setFiles} />
              <input
                ref={imageCaptionRef}
                type='text'
                placeholder='Image Caption'
              />
              <input ref={excerptRef} type='text' placeholder='Excerpt' />
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
        </div>
      </DashboardWrite>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { _id: query.id || null }, // will be passed to the page component as props
  };
};

export default IndexPage;

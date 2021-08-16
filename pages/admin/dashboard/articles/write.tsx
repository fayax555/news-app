import { FC, FormEventHandler, useRef, useState, memo } from 'react';
import { Descendant } from 'slate';
import dynamic from 'next/dynamic';
import Layout from 'components/Layout/Layout';
import { Button } from 'components/Styles/Styles';
import FilePondComponent from 'components/Dashboard/Articles/Editor/FilePond';
import { DashboardWrite, EditorForm } from 'components/Styles/DashboardStyles';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import { GetServerSideProps } from 'next';
import { connectToDatabase } from 'util/mongodb';
import { ObjectId } from 'mongodb';
import { Article } from 'components/NewsPage/ArticleTypes';

const SlateEditor = dynamic(
  () => import('components/Dashboard/Articles/Editor/SlateEditor'),
  { ssr: false }
);

const IndexPage: FC<{ article?: Article }> = ({ article }) => {
  const [headline, setHeadline] = useState(article?.headline || '');
  const [imageCaption, setImageCaption] = useState(article?.imageCaption || '');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');

  // cover image from filepond
  const [files, setFiles] = useState<any>([]);
  // value contains the text inside the slte editor
  const [value, setValue] = useState<any>(
    article?.content || [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
  );

  // console.log(value);

  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsSubmit(true);
    console.log('submit button clicked');

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
      // replace the current article if it exists otherwise insert new
      method: article ? 'PUT' : 'POST',
      body: article
        ? JSON.stringify({ _id: article?._id, ...reqBody })
        : JSON.stringify(reqBody),
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
                type='text'
                placeholder='Headline'
                value={headline}
                onChange={(e) => {
                  setHeadline(e.target.value);
                }}
                required
              />
              <FilePondComponent
                imgUrl={article?.coverImage.imgUrl}
                files={files}
                setFiles={setFiles}
              />
              <input
                type='text'
                value={imageCaption}
                onChange={(e) => {
                  setImageCaption(e.target.value);
                }}
                placeholder='Image Caption'
              />
              <input
                type='text'
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                }}
                placeholder='Excerpt'
              />
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
  if (query.id) {
    try {
      const { db } = await connectToDatabase();

      const article = await db
        .collection('articles')
        .findOne({ _id: new ObjectId(String(query.id)) });

      return {
        props: { article: JSON.parse(JSON.stringify(article)) },
      };
    } catch (error) {
      if (error instanceof TypeError) {
        return {
          redirect: {
            destination: '/admin/dashboard/articles/write',
            permanent: false,
          },
        };
      }

      console.error(error);

      return {
        redirect: {
          destination: '/admin/dashboard/',
          permanent: false,
        },
      };
    }
  }

  return {
    props: { article: null },
  };
};

export default memo(IndexPage);

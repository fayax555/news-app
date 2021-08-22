import { FC, FormEventHandler, useState } from 'react';
import { Descendant } from 'slate';
import dynamic from 'next/dynamic';
import Layout from 'components/Layout/Layout';
import { Button } from 'components/Styles/Styles';
import FilePondComponent from 'components/Dashboard/Articles/Editor/FilePond';
import { DashboardWrite, EditorForm } from 'components/Styles/DashboardStyles';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import { GetServerSideProps } from 'next';
import { connectToDatabase } from 'util/mongodb';
import { Db } from 'mongodb';
import { Article } from 'components/NewsPage/ArticleTypes';
import { getSession } from 'next-auth/client';
import { Session } from 'next-auth';
import Input from 'components/Form/FormEl';

const SlateEditor = dynamic(
  () => import('components/Dashboard/Articles/Editor/SlateEditor'),
  { ssr: false }
);

interface Props {
  article?: Article;
  session?: Session;
}

const WritePage: FC<Props> = ({ article, session }) => {
  const [headline, setHeadline] = useState(article?.headline || '');
  const [imgCaption, setImgCaption] = useState(article?.imageCaption || '');
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
      author: session?.user?.name,
      headline,
      imageCaption: imgCaption,
      excerpt,
      content: value,
      coverImage: {
        name: filenameWithoutExtension,
        size,
        type,
        encodeData: getFileEncodeBase64String(),
      },
    };

    fetch('/api/article/articles', {
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
      .then((data) => alert(data.message))
      .catch((error) => console.log(error));
  };

  return (
    <Layout title='Add New Article'>
      <DashboardWrite>
        <Navbar />
        <div>
          <h2>{`${article ? 'Update' : 'Add New'}`} Article</h2>
          <EditorForm onSubmit={handleSubmit}>
            <div>
              <Input val={headline} setVal={setHeadline} ph='Headline' />
              <FilePondComponent
                imgUrl={article?.coverImage.imgUrl}
                files={files}
                setFiles={setFiles}
              />
              <Input val={imgCaption} setVal={setImgCaption} ph='Img Caption' />
              <Input val={excerpt} setVal={setExcerpt} ph='Excerpt' />
              <SlateEditor value={value} setValue={setValue} />
            </div>
            <div>
              <Button
                fs='1rem'
                isSubmit={isSubmit}
                disabled={false}
                type='submit'
              >
                {`${article ? 'Update' : 'Publish'}`}
              </Button>
            </div>
          </EditorForm>
        </div>
      </DashboardWrite>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const session = await getSession(context);

  if (!session) {
    return {
      notFound: true,
    };
  }

  if (query.id) {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      const article = await db
        .collection('articles')
        .findOne({ nid: query.id });

      return {
        props: { session, article: JSON.parse(JSON.stringify(article)) },
      };
    } catch (error) {
      console.error(error);

      return {
        redirect: {
          destination: '/admin/dashboard/write',
          permanent: false,
        },
      };
    }
  }

  if (session) {
    return {
      props: { session },
    };
  }

  return {
    props: {},
  };
};

export default WritePage;

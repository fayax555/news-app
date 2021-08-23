import { FC } from 'react';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import { DashboardWrap } from 'components/Styles/pages/DashboardStyles';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { connectToDatabase } from 'util/mongodb';
import { Db } from 'mongodb';
import { Article, UpdatedComment } from 'components/NewsPage/ArticleTypes';
import CommentList from 'components/Dashboard/Comments/CommentList';

interface Props {
  comments?: UpdatedComment[];
}

const AllComments: FC<Props> = ({ comments }) => {
  return (
    <Layout title='All vomments'>
      <DashboardWrap>
        <Navbar />
        <div>
          <h2>All comments</h2>
          <CommentList comments={comments} />
        </div>
      </DashboardWrap>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      notFound: true,
    };
  }

  try {
    const { db }: { db: Db } = await connectToDatabase();

    const articles: Article[] = await db
      .collection('articles')
      .find({})
      .toArray();

    const updatedComments: UpdatedComment[] = [];

    articles?.forEach((article) => {
      const { nid, headline } = article;

      article.comments?.forEach((comment) => {
        updatedComments.push({ ...comment, nid, headline });
      });
    });

    return { props: { comments: JSON.parse(JSON.stringify(updatedComments)) } };
  } catch (error) {
    console.log(error);
  }

  return { props: {} };
};

export default AllComments;

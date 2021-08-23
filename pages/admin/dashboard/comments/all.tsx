import { FC } from 'react';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import { DashboardWrap } from 'components/Styles/pages/DashboardStyles';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { connectToDatabase } from 'util/mongodb';
import { Db } from 'mongodb';

interface Props {}

const AllComments: FC<Props> = () => {
  return (
    <Layout title='All vomments'>
      <DashboardWrap>
        <Navbar />
        <div>
          <h2>All comments</h2>
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

    const comments = await db.collection('articles').distinct('comments');

    console.log(comments);
  } catch (error) {}

  return { props: {} };
};

export default AllComments;

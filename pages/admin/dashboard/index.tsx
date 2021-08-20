import { FC } from 'react';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import { DashboardWrap } from 'components/Styles/DashboardStyles';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';

interface Props {}

const Dashboard: FC<Props> = () => {
  return (
    <Layout title='Dashboard'>
      <DashboardWrap>
        <Navbar />
        <div>
          <h2>Welcome to News Dashboard</h2>
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

  return { props: {} };
};

export default Dashboard;

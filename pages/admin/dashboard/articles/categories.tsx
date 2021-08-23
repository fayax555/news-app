import Navbar from 'components/Dashboard/Navbar/Navbar';
import Layout from 'components/Layout/Layout';
import { DashboardWrap } from 'components/Styles/pages/DashboardStyles';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { FC } from 'react';

interface Props {}

const Categories: FC<Props> = () => {
  return (
    <Layout title='Categories'>
      <DashboardWrap>
        <Navbar />
        <div>
          <h2>Categories</h2>
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

  return {
    props: {},
  };
};

export default Categories;

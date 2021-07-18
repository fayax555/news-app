import { FC } from 'react';
import Navbar from 'components/Dashboard/Navbar';
import Layout from 'components/Layout/Layout';

interface Props {}

const Dashboard: FC<Props> = () => {
  return (
    <Layout>
      <Navbar />
    </Layout>
  );
};

export default Dashboard;

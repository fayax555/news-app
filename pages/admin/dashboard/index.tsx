import { FC } from 'react';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import { DashboardWrap } from 'components/Styles/DashboardStyles';

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

export default Dashboard;

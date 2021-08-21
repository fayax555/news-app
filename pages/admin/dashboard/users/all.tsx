import { FC } from 'react';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import { DashboardWrap } from 'components/Styles/DashboardStyles';

interface Props {}

const AllUsers: FC<Props> = () => {
  return (
    <Layout title='All users'>
      <DashboardWrap>
        <Navbar />
        <div>
          <h2>All users</h2>
        </div>
      </DashboardWrap>
    </Layout>
  );
};

export default AllUsers;

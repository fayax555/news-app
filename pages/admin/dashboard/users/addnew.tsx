import { FC } from 'react';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import { DashboardWrap } from 'components/Styles/pages/DashboardStyles';

interface Props {}

const Addnew: FC<Props> = () => {
  return (
    <Layout title='Add new user'>
      <DashboardWrap>
        <Navbar />
        <div>
          <h2>Add new user</h2>
        </div>
      </DashboardWrap>
    </Layout>
  );
};

export default Addnew;

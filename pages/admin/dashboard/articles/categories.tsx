import Navbar from 'components/Dashboard/Navbar/Navbar';
import Layout from 'components/Layout/Layout';
import { DashboardWrap } from 'components/Styles/DashboardStyles';
import React, { FC } from 'react';

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

export default Categories;

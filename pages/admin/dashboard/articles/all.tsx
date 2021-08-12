import React, { FC } from 'react';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import Layout from 'components/Layout/Layout';
import { DashboardWrap } from 'components/Styles/DashboardStyles';

interface Props {}

const All: FC<Props> = () => {
  return (
    <Layout title='All Aritlces'>
      <DashboardWrap>
        <Navbar />
        <div>
          <h2>All Articles</h2>
        </div>
      </DashboardWrap>
    </Layout>
  );
};

export default All;

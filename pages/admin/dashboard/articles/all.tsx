import React, { FC } from 'react';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import Layout from 'components/Layout/Layout';
import { DashboardWrap } from 'components/Styles/DashboardStyles';
import ArticleList from 'components/Dashboard/Articles/ArticleList/ArticleList';

interface Props {}

const AllArticlesPage: FC<Props> = () => {
  return (
    <Layout title='Aritlces'>
      <DashboardWrap>
        <Navbar />
        <ArticleList />
      </DashboardWrap>
    </Layout>
  );
};

export default AllArticlesPage;

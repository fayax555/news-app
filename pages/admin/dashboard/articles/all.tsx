import React, { FC } from 'react';
import Navbar from 'components/Dashboard/Navbar/Navbar';
import Layout from 'components/Layout/Layout';
import { DashboardWrap } from 'components/Styles/DashboardStyles';
import ArticleList from 'components/Dashboard/Articles/ArticleList/List';
import { connectToDatabase } from 'util/mongodb';
import { Article } from 'components/NewsPage/ArticleTypes';

interface Props {
  articles: Article[];
}

const AllArticlesPage: FC<Props> = ({ articles }) => {
  return (
    <Layout title='Aritlces'>
      <DashboardWrap>
        <Navbar />
        <ArticleList articles={articles} />
      </DashboardWrap>
    </Layout>
  );
};

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const articles = await db
    .collection('articles')
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
}

export default AllArticlesPage;

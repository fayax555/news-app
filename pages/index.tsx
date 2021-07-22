import { FC } from 'react';
import Link from 'next/link';
import Layout from 'components/Layout/Layout';
import ArticleList from 'components/MainPage/ArticleList';
import { NewsWrap } from 'components/Styles/ArticleStyles';
import { connectToDatabase } from 'util/mongodb';

interface Props {
  articles: any;
}

const Home: FC<Props> = ({ articles }) => {
  return (
    <Layout>
      <NewsWrap>
        <ArticleList articles={articles} />
      </NewsWrap>
    </Layout>
  );
};

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const articles = await db
    .collection('articles')
    .find({})
    .sort({ _id: -1 })
    .toArray();

  // console.log(articles);

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
    revalidate: 1,
  };
}

export default Home;

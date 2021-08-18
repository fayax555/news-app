import { FC } from 'react';
import Layout from 'components/Layout/Layout';
import ArticleList from 'components/NewsPage/ArticleList';
import { NewsWrap } from 'components/Styles/ArticleStyles';
import { connectToDatabase } from 'util/mongodb';
import { Article } from 'components/NewsPage/ArticleTypes';
import { Db } from 'mongodb';

interface Props {
  articles: Article[];
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
  const { db }: { db: Db } = await connectToDatabase();

  const articles = await db
    .collection('articles')
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
    revalidate: 1,
  };
}

export default Home;

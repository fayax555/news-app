import { FC, useEffect } from 'react';
import Layout from 'components/Layout/Layout';
import Article from 'components/NewsPage/Article/Article';
import { NewsWrap } from 'components/Styles/ArticleStyles';
import { connectToDatabase } from 'util/mongodb';
import { Article as ArticleType } from 'components/NewsPage/ArticleTypes';
import { GetStaticProps, GetStaticPaths } from 'next';
import countapi from 'countapi-js';

interface Props {
  article: ArticleType;
}

const NewsId: FC<Props> = ({ article }) => {
  useEffect(() => {
    countapi.visits(article._id).then((result) => {
      console.log(result.value);

      fetch('/api/')
    });
  }, [article._id]);

  return (
    <Layout>
      <NewsWrap>
        <Article article={article} />
      </NewsWrap>
    </Layout>
  );
};

async function getArticles() {
  const { db } = await connectToDatabase();

  return await db.collection('articles').find({}).toArray();
}

export const getStaticProps: GetStaticProps = async (context) => {
  const nid = context.params?.id;

  const article: ArticleType = (await getArticles()).find(
    (articleItem: ArticleType) => articleItem.nid === nid
  );

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids: string[] = (await getArticles()).map(
    (article: ArticleType) => article.nid
  );
  const paths = ids.map((id: string) => ({ params: { id } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default NewsId;

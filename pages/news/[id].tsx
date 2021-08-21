import { FC, useEffect } from 'react';
import Layout from 'components/Layout/Layout';
import Article from 'components/NewsPage/Article/Article';
import { NewsWrap } from 'components/Styles/ArticleStyles';
import { connectToDatabase } from 'util/mongodb';
import { Article as ArticleType } from 'components/NewsPage/ArticleTypes';
import { GetStaticProps, GetStaticPaths } from 'next';

interface Props {
  article: ArticleType;
}

const NewsId: FC<Props> = ({ article }) => {
  // page visits
  // everytime an article page is visited, view count is inc by 1
  useEffect(() => {
    fetch(`/api/article/${article._id}`, {
      method: 'PUT',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

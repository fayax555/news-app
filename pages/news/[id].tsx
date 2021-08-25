import { FC, useEffect } from 'react';
import Layout from 'components/Layout/Layout';
import Article from 'components/NewsPage/Article/Article';
import { NewsWrap } from 'components/Styles/pages/ArticleStyles';
import { connectToDatabase } from 'util/mongodb';
import { Article as ArticleType } from 'components/NewsPage/ArticleTypes';
import { GetStaticProps, GetStaticPaths } from 'next';

interface Props {
  article: ArticleType;
}

const NewsId: FC<Props> = ({ article }) => {
  return (
    <Layout>
      <NewsWrap>
        <Article article={article} />
      </NewsWrap>
    </Layout>
  );
};

async function getArticles() {
  try {
    const { db } = await connectToDatabase();

    return await db.collection('articles').find({}).toArray();
  } catch (error) {
    console.log(error);
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const nid = context.params?.id;

  const article: ArticleType = (await getArticles()).find(
    (articleItem: ArticleType) => articleItem.nid === nid
  );

  if (!article) return { notFound: true };

  // removing comments that are not approved before sending to the client
  const comments = article.comments
    ?.filter((c) => c.status === 'approved')
    .map(({ cid, comment, name, createdAt }) => ({
      // removing status field; client doesn't need to know this
      cid,
      comment,
      name,
      createdAt,
    }));

  return {
    props: {
      article: JSON.parse(JSON.stringify({ ...article, comments })),
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

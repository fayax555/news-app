import { FC } from 'react';
import Link from 'next/link';
import Layout from 'components/Layout/Layout';
import Article from 'components/Article/Article';
import { NewsWrap } from 'components/Styles/ArticleStyles';
import { useRouter } from 'next/router';
import { connectToDatabase } from 'util/mongodb';

interface Props {
  article: any;
}

const NewsId: FC<Props> = ({ article }) => {
  const router = useRouter();

  // if (!article) return <h1>Loading</h1>;
  // const article = {
  //   title: 'Relic Is Teasing Something on its Twitch Channel',
  //   body: `There is something going on over on Relic Entertainment's twitch channel. The developer seems to be broadcasting a map of the Mediterranean Sea shown from high above, and it is stylized in a way that gives off early 20th Century vibes. There is one franchise in the studio's history that definitely aligns with this most closely, but just to be thorough, let's explore all the possibilities.`,
  // };

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

export async function getStaticProps(context: any) {
  const nid = context.params.id;

  const article = (await getArticles()).find((item: any) => item.nid === nid);

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const ids = (await getArticles()).map((article: any) => article.nid);
  const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default NewsId;

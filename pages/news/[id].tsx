import { FC } from 'react';
import Link from 'next/link';
import Article from '@/components/Article';
import { NewsWrap } from 'components/ArticleStyles';
import { useRouter } from 'next/router';
import { connectToDatabase } from 'util/mongodb';

interface Props {
  article: any;
}

const NewsId: FC<Props> = ({ article }) => {
  const router = useRouter();

  if (!article) return <h1>Loading</h1>;

  return (
    <NewsWrap>
      <h1
        onClick={() => {
          router.push('/');
        }}
      >
        News
      </h1>
      <Article article={article} />
    </NewsWrap>
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

import { FC } from 'react';
import Link from 'next/link';
import Article from '@/components/Article';
import { NewsWrap } from 'components/ArticleStyles';
import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';

interface Props {
  article: any;
}

const NewsId: FC<Props> = ({ article }) => {
  const router = useRouter();

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
  const client = await MongoClient.connect(
    'mongodb+srv://fayax555:rnsDZrSwDUd3w1F2@cluster0.jhvmq.mongodb.net/newsdatabase?retryWrites=true&w=majority'
  );

  const db = client.db();
  return await db.collection('articles').find({}).toArray();
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const nid = params.id;
  console.log(nid);

  const article = (await getArticles()).find(
    (item: any) => item._id.toString() === nid
  );

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const ids = (await getArticles()).map((article: any) => article._id);
  const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default NewsId;

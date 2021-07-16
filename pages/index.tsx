import { FC } from 'react';
import Link from 'next/link';
import ArticleList from '@/components/ArticleList';
import { NewsWrap, NewsBtnWrap } from 'components/ArticleStyles';
import { MongoClient } from 'mongodb';

interface Props {
  articles: any;
}

const Home: FC<Props> = ({ articles }) => {
  return (
    <NewsWrap>
      <div>
        <Link href='/' passHref>
          <h1>News</h1>
        </Link>
      </div>
      <NewsBtnWrap>
        <Link href='/write' passHref>
          <button>Write</button>
        </Link>
      </NewsBtnWrap>
      <ArticleList articles={articles} />
    </NewsWrap>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://fayax555:rnsDZrSwDUd3w1F2@cluster0.jhvmq.mongodb.net/newsdatabase?retryWrites=true&w=majority'
  );

  const db = client.db();
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

import fs from 'fs';
import path from 'path';
import { FC } from 'react';
import Link from 'next/link';
import Article from '@/components/Article';
import { NewsWrap } from 'components/ArticleStyles';

interface Props {
  article: any;
}

const NewsId: FC<Props> = ({ article }) => {
  return (
    <NewsWrap>
      <Link href='/' passHref>
        <h1>News</h1>
      </Link>
      <Article article={article} />
    </NewsWrap>
  );
};

function getData() {
  const filePath = path.join(process.cwd(), 'data', 'articleData.json');
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData.toString());
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const nid = params.id;

  const article = getData().find((item: any) => item.id === nid);

  return {
    props: {
      article,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const ids = getData().map((article: any) => article.id);
  const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default NewsId;
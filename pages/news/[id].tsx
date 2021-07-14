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

export async function getStaticProps(context: any) {
  const { params } = context;
  const nid = params.id;

  const filePath = path.join(process.cwd(), 'data', 'articleData.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());
  const article = data.find((item: any) => item.id === nid);

  return {
    props: {
      article,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
      { params: { id: '4' } },
      { params: { id: '5' } },
    ],
    fallback: false,
  };
}

export default NewsId;

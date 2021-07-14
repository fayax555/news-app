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
  if (!article) {
    return <h1>Loading!</h1>;
  }

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
  console.log(article);
  return {
    props: {
      article,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'articleData.json');
  const jsonData = fs.readFileSync(filePath);
  const articles = JSON.parse(jsonData.toString());
  const ids = articles.map((article: any) => article.id);
  const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: true,
  };
}

export default NewsId;

import fs from 'fs';
import path from 'path';
import { FC } from 'react';
import Link from 'next/link';
import Article from '@/components/Article';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  > h1:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

interface Props {
  article: any;
}

const NewsId: FC<Props> = ({ article }) => {
  console.log(article);
  return (
    <Wrapper>
      <Link href='/' passHref>
        <h1>News</h1>
      </Link>
      <Article article={article} />
    </Wrapper>
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
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false,
  };
}

export default NewsId;

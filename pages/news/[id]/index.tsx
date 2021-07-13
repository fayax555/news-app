import { FC } from 'react';
import { server } from 'config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Article from '@/components/Article';

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

const News: FC<Props> = ({ article }) => {
  return (
    <Wrapper>
      <Link href='/' passHref>
        <h1>News</h1>
      </Link>
      <Article article={article} />
    </Wrapper>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`);
  const article = await res.json();

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();

  const ids = articles.map((article: any) => article.id);
  const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default News;

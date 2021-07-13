import { FC } from 'react';
import { server } from 'config';
import Link from 'next/link';
import ArticleList from '@/components/ArticleList';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  > h1:hover,
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

interface Props {
  articles: any;
}

const Home: FC<Props> = ({ articles }) => {
  return (
    <Wrapper>
      <Link href='/' passHref>
        <h1>News</h1>
      </Link>
      <ArticleList articles={articles} />
    </Wrapper>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};

export default Home;

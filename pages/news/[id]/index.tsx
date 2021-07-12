import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Article from '@/components/Article';
import { articles } from '@/components/articleData';

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

const Index: FC = () => {
  const { query } = useRouter();
  if (query.id === undefined) {
    return null;
  }

  const id = Number(query.id) - 1;
  const article = articles[id];

  return (
    <Wrapper>
      <Link href='/' passHref>
        <h1>News</h1>
      </Link>
      <Article article={article} />
    </Wrapper>
  );
};

export default Index;

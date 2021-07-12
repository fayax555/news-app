import { FC } from 'react';
import Link from 'next/link';
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

const Index: FC = () => {
  return (
    <Wrapper>
      <Link href='/' passHref>
        <h1>News</h1>
      </Link>
      <Article />
    </Wrapper>
  );
};

export default Index;

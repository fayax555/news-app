import styled from 'styled-components';
import Link from 'next/link';
import ArticleList from '@/components/ArticleList';

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

export default function Home() {
  return (
    <Wrapper>
      <Link href='/' passHref>
        <h1>News</h1>
      </Link>
      <ArticleList />
    </Wrapper>
  );
}

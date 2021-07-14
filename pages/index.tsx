import { FC } from 'react';
import Link from 'next/link';
import ArticleList from '@/components/ArticleList';
import styled from 'styled-components';
import { buildFeedbackPath, extractFeedback } from 'pages/api/articles/index';

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

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  
  return {
    props: {
      articles: data,
    },
  };
}

export default Home;

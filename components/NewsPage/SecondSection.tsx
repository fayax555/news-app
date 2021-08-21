import { FC } from 'react';
import styled from 'styled-components';
import { Article } from './ArticleTypes';
import ArticleItem from './ArticleListItem';

const SecondSectionWrap = styled.section`
  padding: 3rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  a {
    h2 {
      font-size: 1.1rem;
    }

    &:hover {
      img {
        opacity: 0.8;
      }

      h2 {
        text-decoration: underline;
      }
    }
  }
`;

interface Props {
  articles: Article[];
}

const SecondSection: FC<Props> = ({ articles }) => {
  return (
    <SecondSectionWrap>
      {articles.slice(5).map((article) => (
        <ArticleItem
          key={article._id}
          article={article}
          height={280}
          width={400}
        />
      ))}
    </SecondSectionWrap>
  );
};

export default SecondSection;

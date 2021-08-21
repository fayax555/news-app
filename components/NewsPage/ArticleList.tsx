import { FC } from 'react';
import ArticleItem from './ArticleListItem';
import Header from './Header/Header';
import SecondSection from './SecondSection';
import styled from 'styled-components';
import { Article } from './ArticleTypes';

const ListWrap = styled.div`
  display: flex;
  font-size: 0.6rem;
  gap: 3rem;
  padding-top: 3rem;

  a {
    border: 1px solid #aaa;
    width: 300px;
    padding: 1rem;
  }
`;

interface Props {
  articles: Article[];
}

const ArticleList: FC<Props> = ({ articles }) => {
  if (articles.length > 0)
    return (
      <>
        <Header articles={articles} />
        <SecondSection articles={articles} />
      </>
    );

  return null;
};

export default ArticleList;

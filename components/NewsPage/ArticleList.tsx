import { FC } from 'react';
import ArticleItem from './ArticleItem';
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
  return (
    <>
      <Header articles={articles} />
      <SecondSection articles={articles} />
      <ListWrap>
        {/* {articles.map((article: any) => (
          <ArticleItem
            key={article._id}
            newsId={article.nid}
            title={article.headline}
          />
        ))} */}
      </ListWrap>
    </>
  );
};

export default ArticleList;

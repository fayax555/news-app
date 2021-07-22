import { FC } from 'react';
import ArticleItem from './ArticleItem';
import Header from './Header';
import SecondSection from './SecondSection';
import styled from 'styled-components';

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
  articles: any;
}

const ArticleList: FC<Props> = ({ articles }) => {
  return (
    <>
      {/* <Header />
      <SecondSection /> */}
      <ListWrap>
        {articles.map((article: any) => (
          <ArticleItem
            key={article._id}
            newsId={article.nid}
            title={article.headline}
            // description={article.content.slice(0, 120)}
          />
        ))}
      </ListWrap>
    </>
  );
};

export default ArticleList;

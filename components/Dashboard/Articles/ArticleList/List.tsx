import { FC } from 'react';
import ArticleListTable from './Table';
import { Article } from 'components/NewsPage/ArticleTypes';

interface Props {
  articles: Article[];
}

const ArticleList: FC<Props> = ({ articles }) => {
  return (
    <div>
      <h2>Articles</h2>
      <ArticleListTable articles={articles} />
    </div>
  );
};

export default ArticleList;

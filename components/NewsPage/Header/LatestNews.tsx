import { FC } from 'react';
import { HeaderLeft } from '../../Styles/ArticleStyles';
import { Article } from '../ArticleTypes';
import ArticleItem from '../ArticleItem';

interface Props {
  articles: Article[];
}

const LatestNews: FC<Props> = ({ articles }) => {
  return (
    <HeaderLeft>
      <h1>Latest News</h1>
      {articles.slice(1, 5).map((article) => (
        <ArticleItem
          key={article._id}
          article={article}
          height={80}
          width={100}
        />
      ))}
    </HeaderLeft>
  );
};

export default LatestNews;

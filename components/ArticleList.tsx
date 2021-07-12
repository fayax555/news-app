import { FC } from 'react';
import ArticleItem from './ArticleItem';
import { ArticleListWrap } from './ArticleStyles';
import { articles } from './articleData';

interface Props {}

const ArticleList: FC<Props> = () => {
  return (
    <ArticleListWrap>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          newsId={article.id}
          title={article.title}
          description={article.content.slice(0,120)}
        />
      ))}
    </ArticleListWrap>
  );
};

export default ArticleList;

import { FC } from 'react';
import ArticleItem from './ArticleItem';
import { ArticleListWrap } from './ArticleStyles';

interface Props {
  articles: any;
}

const ArticleList: FC<Props> = ({ articles }) => {
  return (
    <ArticleListWrap>
      {articles.map((article: any) => (
        <ArticleItem
          key={article._id}
          newsId={article._id}
          title={article.title}
          description={article.body.slice(0, 120)}
        />
      ))}
    </ArticleListWrap>
  );
};

export default ArticleList;

import { FC } from 'react';
import { ArticleWrap } from './ArticleStyles';
import ArticleInfo from './ArticleInfo';

interface Props {
  article: {
    id: number;
    name: string;
    date: string;
    title: string;
    body: string;
  };
}

const Article: FC<Props> = ({ article }) => {
  return (
    <ArticleWrap>
      <h2>{article.title}</h2>
      <ArticleInfo name={article.name} date={article.date} />
      <p>{article.body}</p>
    </ArticleWrap>
  );
};

export default Article;

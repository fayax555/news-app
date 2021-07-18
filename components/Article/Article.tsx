import { FC } from 'react';
import { ArticleWrap } from '../Styles/ArticleStyles';
import ArticleInfo from './ArticleInfo';

interface Props {
  article: {
    id?: number;
    name?: string;
    date?: string;
    title: string;
    body: string;
  };
}

const Article: FC<Props> = ({ article }) => {
  return (
    <ArticleWrap>
      <h1>{article.title}</h1>
      {/* <ArticleInfo name={article.name} date={article.date} /> */}
      <p>{article.body}</p>
    </ArticleWrap>
  );
};

export default Article;

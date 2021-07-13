import { FC } from 'react';
import { ArticleWrap } from './ArticleStyles';
import ArticleInfo from './ArticleInfo';

interface Props {
  article: {
    id: number;
    name: string;
    authorImg: StaticImageData;
    date: string;
    title: string;
    body: string;
  };
}

const Article: FC<Props> = ({ article }) => {
  console.log(article);
  return (
    <ArticleWrap>
      <h2>{article.title}</h2>
      <ArticleInfo
        name={article.name}
        date={article.date}
        img={article.authorImg}
      />
      <p>{article.body}</p>
    </ArticleWrap>
  );
};

export default Article;

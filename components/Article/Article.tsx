import { FC } from 'react';
import { ArticleWrap } from '../Styles/ArticleStyles';
import ArticleInfo from './ArticleInfo';

interface Props {
  article: {
    id?: number;
    name?: string;
    date?: string;
    headline: string;
    content: any;
  };
}

const Article: FC<Props> = ({ article: { headline, content } }) => {
  console.log(content);

  const data = content.map((c: any, i: number) => {
    const text = c.children[0].text;

    return <p key={i}>{text}</p>;
  });

  return (
    <ArticleWrap>
      <h1>{headline}</h1>
      {data}
      {/* <ArticleInfo name={article.name} date={article.date} /> */}
      {/* <p>{article.body}</p> */}
    </ArticleWrap>
  );
};

export default Article;

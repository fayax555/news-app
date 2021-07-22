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
  interface contentProps {
    children: [
      { text: string; bold?: boolean; italic?: boolean; underline?: boolean }
    ];
    type: string;
  }

  const contentData = content.map(
    ({ children, type }: contentProps, i: number) => {
      let result = '';
      const text = children.map((c) => {
        if (c.bold) {
          return (
            <span style={{ fontWeight: 'bold' }} key={c.bold + c.text}>
              {c.text}
            </span>
          );
        } else return c.text;
      });

      console.log(text);

      // if (type === 'h3') return <h3 key={type + i}>{children[0].text}</h3>;

      if (type === 'paragraph') return <p key={type + i}>{text}</p>;
    }
  );

  return (
    <ArticleWrap>
      <h1>{headline}</h1>
      {contentData}
      {/* <ArticleInfo name={article.name} date={article.date} /> */}
      {/* <p>{article.body}</p> */}
    </ArticleWrap>
  );
};

export default Article;

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
      {
        text?: any;
        bold?: any;
        italic?: any;
        underline?: any;
      }
    ];
    type: string;
  }

  const contentData = content.map(
    ({ children, type }: contentProps, i: number) => {
      const inlineFormatTypes = (
        text: string,
        bold: boolean,
        italic: boolean,
        underline: boolean
      ) => {
        if (bold) {
          return (
            <span style={{ fontWeight: 'bold' }} key={bold + text}>
              {text}
            </span>
          );
        }

        if (italic) {
          return (
            <span style={{ fontStyle: 'italic' }} key={italic + text}>
              {text}
            </span>
          );
        }

        if (underline) {
          return (
            <span
              style={{ textDecoration: 'underline' }}
              key={underline + text}
            >
              {text}
            </span>
          );
        }

        return text;
      };

      const text = children.map(({ text, bold, italic, underline }) => {
        return inlineFormatTypes(text, bold, italic, underline);
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

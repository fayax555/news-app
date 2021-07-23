import { nanoid } from 'nanoid';
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
    ({ children, type }: contentProps, index: number) => {
      const inlineFormatTypes = (
        text: string,
        bold: boolean,
        italic: boolean,
        underline: boolean
      ) => {
        if (bold) {
          return (
            <span key={bold + text + index} style={{ fontWeight: 'bold' }}>
              {text}
            </span>
          );
        }

        if (italic) {
          return (
            <span key={italic + text + index} style={{ fontStyle: 'italic' }}>
              {text}
            </span>
          );
        }

        if (underline) {
          return (
            <span
              key={underline + text + index}
              className='underlineStyle'
              style={{ textDecoration: 'underline' }}
            >
              {text}
            </span>
          );
        }

        return text;
      };

      const textContent = children.map(({ text, bold, italic, underline }) => {
        return inlineFormatTypes(text, bold, italic, underline);
      });

      if (type === 'h2') return <h2 key={type + index}>{textContent}</h2>;
      if (type === 'h3') return <h3 key={type + index}>{textContent}</h3>;
      if (type === 'paragraph') return <p key={type + index}>{textContent}</p>;
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

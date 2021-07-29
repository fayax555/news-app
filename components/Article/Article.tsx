import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { ArticleWrap } from '../Styles/ArticleStyles';
import ArticleInfo from './ArticleInfo';
import Image from 'next/image';
import { Tweet } from 'react-twitter-widgets';
import {
  CaptionBox,
  TweetWrap,
} from 'components/Dashboard/SlateEditor/EditorStyles';

interface Props {
  article: {
    id?: number;
    name?: string;
    date?: string;
    headline: string;
    content: any;
    coverImage: {
      name: string;
      size: number;
      type: string;
      encodeData: string;
    };
  };
}

interface contentProps {
  children: [
    {
      text?:
        | DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
        | string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
    }
  ];
  type: string;
  videoId: string;
  tweetId: string;
}

const Article: FC<Props> = ({
  article: {
    headline,
    content,
    coverImage: { name, size, type, encodeData },
  },
}) => {
  console.log(content);

  const contentData = content.map(
    ({ children, type, videoId, tweetId }: contentProps, index: number) => {
      const inlineFormatTypes = (
        markIndex: number,
        text: any,
        bold: boolean | undefined,
        italic: boolean | undefined,
        underline: boolean | undefined
      ) => {
        text = text.replace(/  +/g, '');

        if (bold) {
          text = <strong key={markIndex}>{text}</strong>;
        }

        if (italic) {
          text = <em key={markIndex}>{text}</em>;
        }

        if (underline) {
          text = <u key={markIndex}>{text}</u>;
        }

        return text;
      };

      const textContent = children.map(
        ({ text, bold, italic, underline }, markIndex) => {
          return inlineFormatTypes(markIndex, text, bold, italic, underline);
        }
      );

      if (type === 'h2') return <h2 key={type + index}>{textContent}</h2>;
      if (type === 'h3') return <h3 key={type + index}>{textContent}</h3>;
      if (type === 'paragraph') return <p key={type + index}>{textContent}</p>;
      if (type === 'cc')
        return <CaptionBox key={type + index}>{textContent}</CaptionBox>;
      if (type === 'youtube') {
        return (
          <iframe
            contentEditable={false}
            title='Youtube video'
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder='0'
          ></iframe>
        );
      }

      if (type === 'tweet')
        return (
          <TweetWrap>
            <Tweet
              tweetId={tweetId}
              options={{
                width: 300,
              }}
            />
          </TweetWrap>
        );
    }
  );

  return (
    <ArticleWrap>
      <h1>{headline}</h1>
      <div>
        <Image
          src={`data:${type};base64,${encodeData}`}
          height={350}
          width={700}
          alt=''
        />
      </div>
      {contentData}
      {/* <ArticleInfo name={article.name} date={article.date} /> */}
      {/* <p>{article.body}</p> */}
    </ArticleWrap>
  );
};

export default Article;

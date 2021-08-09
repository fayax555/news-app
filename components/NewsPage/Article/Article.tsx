import { CSSProperties, FC, ReactElement } from 'react';
import { ArticleWrap } from '../../Styles/ArticleStyles';
import ArticleInfo from './ArticleInfo';
import Image from 'next/image';
import { Tweet } from 'react-twitter-widgets';
import {
  CaptionBox,
  TweetWrap,
  Link,
} from 'components/Dashboard/SlateEditor/EditorStyles';
import { Article as ArticleProps, Content } from '../ArticleTypes';

const Article: FC<{ article: ArticleProps }> = ({
  article: {
    headline,
    content,
    coverImage: { name, size, type, imgUrl },
  },
}) => {
  // console.log(content);

  const contentData = content.map(
    ({ children, type, videoId, tweetId }, index: number) => {
      const textContent = children.map(
        ({ type, url, children, text, bold, italic, underline }, markIndex) => {
          if (text) text = text.replace(/  +/g, '');

          if (type === 'link') {
            text = children.map((link, linkIndex) => {
              let linkText: ReactElement<any, any>;
              let linkStyle: CSSProperties | undefined;

              if (link.bold) {
                linkStyle = { fontWeight: 'bold', ...linkStyle };
              }

              if (link.italic) {
                linkStyle = { fontStyle: 'italic', ...linkStyle };
              }

              if (link.underline) {
                linkStyle = { textDecoration: 'underline', ...linkStyle };
              }

              linkText = (
                <Link
                  target='_blank'
                  style={linkStyle}
                  href={url}
                  key={'link' + String(linkIndex)}
                >
                  {link.text}
                </Link>
              );

              return linkText;
            });
          }

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
            key={type + index}
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
            <Tweet tweetId={tweetId} />
          </TweetWrap>
        );
    }
  );

  return (
    <ArticleWrap>
      <h1>{headline}</h1>
      <div>
        <Image src={imgUrl} height={350} width={700} alt='' />
      </div>
      {contentData}
      {/* <ArticleInfo name={article.name} date={article.date} /> */}
      {/* <p>{article.body}</p> */}
    </ArticleWrap>
  );
};

export default Article;

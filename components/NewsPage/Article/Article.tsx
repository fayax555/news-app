import { CSSProperties, FC, ReactElement, useEffect } from 'react';
import { ArticleWrap } from '../../Styles/pages/ArticleStyles';
import ArticleInfo from './ArticleInfo';
import Image from 'next/image';
import { Tweet } from 'react-twitter-widgets';
import {
  CaptionBox,
  TweetWrap,
  Link,
} from 'components/Dashboard/Articles/Editor/styles';
import { Article as ArticleProps } from '../ArticleTypes';
import { ContentImage } from '../../Styles/pages/ArticleStyles';
import CommentForm from './Comments/CommentForm';
import Comments from './Comments/Comments';
import { useRouter } from 'next/router';

const Article: FC<{ article: ArticleProps }> = ({
  article: {
    author,
    _id,
    headline,
    content,
    imageCaption,
    coverImage: { name, size, type, imgUrl },
    comments,
  },
}) => {
  const contentData = content.map(
    ({ children, type, url, videoId, tweetId }, index) => {
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
      if (type === 'image')
        return (
          <ContentImage key={type + index}>
            <Image src={String(url)} width={600} height={340} alt='' />;
          </ContentImage>
        );

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
          <TweetWrap key={type + index}>
            <Tweet tweetId={tweetId} />
          </TweetWrap>
        );
    }
  );

  // page visits
  // everytime an article page is visited, view count is inc by 1
  const router = useRouter();
  useEffect(() => {
    fetch('/api/article/views', {
      method: 'PATCH',
      body: JSON.stringify({ id: router.query.id }),
      headers: { 'Content-Type': 'application/json' },
    });
  }, [router.query.id]);

  return (
    <ArticleWrap>
      <h1>{headline}</h1>
      <div>
        <Image src={imgUrl} height={400} width={700} alt='' />
        <CaptionBox>{imageCaption}</CaptionBox>
      </div>
      <ArticleInfo author={author} _id={_id} />
      {contentData}
      <CommentForm _id={_id} />
      {comments && comments?.length > 0 && <Comments comments={comments} />}
    </ArticleWrap>
  );
};

export default Article;

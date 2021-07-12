import { FC } from 'react';
import { ArticleWrap } from './ArticleStyles';
import ArticleInfo from './ArticleInfo';

interface Props {}

const Article: FC<Props> = () => {
  return (
    <ArticleWrap>
      <h2>Relic Is Teasing Something on its Twitch Channel</h2>
      <ArticleInfo />
      <p>
        There is something going on over on Relic Entertainment&apos; twitch
        channel. The developer seems to be broadcasting a map of the
        Mediterranean Sea shown from high above, and it is stylized in a way
        that gives off early 20th Century vibes. There is one franchise in the
        studio&apos; history that definitely aligns with this most closely, but
        just to be thorough, let&apos; explore all the possibilities.
      </p>
    </ArticleWrap>
  );
};

export default Article;

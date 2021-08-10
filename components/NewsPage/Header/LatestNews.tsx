import { FC } from 'react';
import { HeaderLeft } from '../../Styles/ArticleStyles';
import { Article } from '../ArticleTypes';
import ArticleItem from '../ArticleItem';

interface Props {
  articles: Article[];
}

const LatestNews: FC<Props> = ({ articles }) => {
  return (
    <HeaderLeft>
      <h1>Latest News</h1>
      {articles.slice(1, 5).map(({ headline, nid, coverImage: { imgUrl } }) => (
        <ArticleItem
          key={nid}
          props={{ nid, headline, imgUrl, height: 100, width: 80 }}
        />
      ))}
    </HeaderLeft>
  );
};

export default LatestNews;

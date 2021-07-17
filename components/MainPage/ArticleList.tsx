import { FC } from 'react';
import ArticleItem from '../ArticleItem';
import { ArticleListWrap } from '../ArticleStyles';
import Header from './Header';
import SecondSection from './SecondSection';

interface Props {
  // articles: any;
}

const ArticleList: FC<Props> = () => {
  return (
    <ArticleListWrap>
      <Header />
      <SecondSection />
      {/* {articles.map((article: any) => (
        <ArticleItem
          key={article._id}
          newsId={article.nid}
          title={article.title}
          description={article.body.slice(0, 120)}
        />
      ))} */}
    </ArticleListWrap>
  );
};

export default ArticleList;

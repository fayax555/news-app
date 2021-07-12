import { FC } from 'react';
import { useRouter } from 'next/router';
import { ArticleWrap } from './ArticleStyles';
import ArticleInfo from './ArticleInfo';
import { articles } from './articleData';

interface Props {}

const Article: FC<Props> = () => {
  const {
    query: { id },
  } = useRouter();

  const article = articles[Number(id) - 1];
  console.log(id);

  return (
    <ArticleWrap>
      <h2>{article.title}</h2>
      <ArticleInfo
        name={article.name}
        date={article.date}
        img={article.authorImg}
      />
      <p>{article.content}</p>
    </ArticleWrap>
  );
};

export default Article;

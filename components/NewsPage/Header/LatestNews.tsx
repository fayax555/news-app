import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderLeft } from '../../Styles/ArticleStyles';
import { Article } from '../ArticleTypes';

interface Props {
  articles: Article[];
}

const LatestNews: FC<Props> = ({ articles }) => {
  return (
    <HeaderLeft>
      <h1>Latest News</h1>
      {articles.slice(1, 5).map(({ headline, nid, coverImage: { imgUrl } }) => (
        <Link key={nid} href={`/news/${nid}`} passHref>
          <a>
            <Image src={imgUrl} width={1000} height={800} alt='' />
            <h2>{headline}</h2>
          </a>
        </Link>
      ))}
    </HeaderLeft>
  );
};

export default LatestNews;

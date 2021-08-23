import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../ArticleTypes';
import { HeaderWrap, LinkWrap } from '../../Styles/pages/ArticleStyles';
import LatestNews from './LatestNews';

const Header: FC<{ articles: Article[] }> = ({ articles }) => {
  // first section of the main page
  return (
    <HeaderWrap>
      <LatestNews articles={articles} />
      <Link href={`/news/${articles[0].nid}`} passHref>
        <LinkWrap>
          <div>
            <Image
              src={articles[0].coverImage.imgUrl}
              width={1100}
              height={750}
              alt=''
            />
            <div>
              <h1>{articles[0].headline}</h1>
              <p>{articles[0].excerpt}</p>
            </div>
          </div>
        </LinkWrap>
      </Link>
    </HeaderWrap>
  );
};

export default Header;

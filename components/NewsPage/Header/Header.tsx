import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../ArticleTypes';
import { HeaderWrap, LinkWrap } from '../../Styles/ArticleStyles';
import LatestNews from './LatestNews';

const Header: FC<{ articles: Article[] }> = ({ articles }) => {
  // first section of the main page
  return (
    <HeaderWrap>
      <LatestNews articles={articles} />
      <Link href={`/news/${articles[0].nid}`} passHref>
        <LinkWrap>
          <Image
            src={articles[0].coverImage.imgUrl}
            width={1100}
            height={700}
            alt=''
          />
          <div>
            <h1>{articles[0].headline}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
              voluptatem.
            </p>
          </div>
        </LinkWrap>
      </Link>
    </HeaderWrap>
  );
};

export default Header;

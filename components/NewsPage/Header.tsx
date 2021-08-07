import { FC } from 'react';
import Image from 'next/image';
import headerImg from 'assets/header.jpg';
import Link from 'next/link';
import { Article } from './ArticleTypes';
import { HeaderWrap, HeaderLeft, LinkWrap } from '../Styles/ArticleStyles';

interface Props {
  articles: Article[];
}

const Header: FC<Props> = ({ articles }) => {
  console.log(articles[0]);
  const {
    nid,
    coverImage: { encodeData, type },
  } = articles[0];

  // first section of the main page
  return (
    <HeaderWrap>
      <HeaderLeft>
        <h1>Latest News</h1>
        <Link href='/news/id' passHref>
          <a>
            <Image src={headerImg} alt='' />
            <h2>Create Device Mockups in Browser with DeviceMock</h2>
          </a>
        </Link>
        <Link href='/news/id' passHref>
          <a>
            <Image src={headerImg} alt='' />
            <h2>Create Device Mockups in Browser with DeviceMock</h2>
          </a>
        </Link>
        <Link href='/news/id' passHref>
          <a>
            <Image src={headerImg} alt='' />
            <h2>Create Device Mockups in Browser with DeviceMock</h2>
          </a>
        </Link>
        <Link href='/news/id' passHref>
          <a>
            <Image src={headerImg} alt='' />
            <h2>Create Device Mockups in Browser with DeviceMock</h2>
          </a>
        </Link>
      </HeaderLeft>
      <Link href={`/news/${nid}`} passHref>
        <LinkWrap>
          <Image
            src={`data:${type};base64,${encodeData}`}
            width={1100}
            height={700}
            alt=''
          />
          <div>
            <h1>{articles[0].headline}</h1>
          </div>
        </LinkWrap>
      </Link>
    </HeaderWrap>
  );
};

export default Header;

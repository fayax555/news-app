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
    coverImage: { imgUrl },
  } = articles[0];
  console.log(imgUrl);

  const latestNews = [
    {
      linkId: 'id1',
      img: { headerImg, altText: 'img1' },
      headline: 'Create Device Mockups in Browser with DeviceMock',
    },
    {
      linkId: 'id2',
      img: { headerImg, altText: 'img2' },
      headline: 'Create Device Mockups in Browser with DeviceMock',
    },
    {
      linkId: 'id3',
      img: { headerImg, altText: 'img3' },
      headline: 'Create Device Mockups in Browser with DeviceMock',
    },
    {
      linkId: 'id4',
      img: { headerImg, altText: 'img4' },
      headline: 'Create Device Mockups in Browser with DeviceMock',
    },
  ];

  // first section of the main page
  return (
    <HeaderWrap>
      <HeaderLeft>
        <h1>Latest News</h1>
        {latestNews.map(({ linkId, img, headline }) => (
          <Link key={linkId} href={`/news/${linkId}`} passHref>
            <a>
              <Image src={img.headerImg} alt={img.altText} />
              <h2>{headline}</h2>
            </a>
          </Link>
        ))}
      </HeaderLeft>
      <Link href={`/news/${nid}`} passHref>
        <LinkWrap>
          <Image src={imgUrl} width={1100} height={700} alt='' />
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

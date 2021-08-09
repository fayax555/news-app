import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from './ArticleTypes';

const SecondSectionWrap = styled.div`
  padding: 3rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem 2rem;

  a {
    h2 {
      font-size: 1.1rem;
    }

    &:hover {
      img {
        opacity: 0.8;
      }

      h2 {
        text-decoration: underline;
      }
    }
  }
`;

interface Props {
  articles: Article[];
}

const SecondSection: FC<Props> = ({ articles }) => {
  return (
    <SecondSectionWrap>
      {articles
        .slice(5)
        .map(({ nid, headline, excerpt, coverImage: { imgUrl } }) => (
          <Link key={nid} href={`/news/${nid}`} passHref>
            <a>
              <Image width={400} height={280} src={imgUrl} alt='' />
              <h2>{headline}</h2>
              <p>{excerpt}</p>
            </a>
          </Link>
        ))}
    </SecondSectionWrap>
  );
};

export default SecondSection;

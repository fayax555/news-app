import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from './ArticleTypes';
import ArticleItem from './ArticleItem';

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
        .map(({ _id, nid, headline, excerpt, coverImage: { imgUrl } }) => (
          <ArticleItem
            key={nid}
            props={{
              _id,
              nid,
              headline,
              excerpt,
              imgUrl,
              height: 280,
              width: 400,
            }}
          />
        ))}
    </SecondSectionWrap>
  );
};

export default SecondSection;

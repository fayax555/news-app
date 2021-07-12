import { FC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import author from '../assets/author.jpg';

const ArticleInfoWrap = styled.div`
  display: flex;
  border-bottom: 1px solid #444;
  align-items: center;
  padding-bottom: 0.75rem;
  margin: 1rem 0;
  gap: 0.5rem;

  div {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }

  p {
    font-size: 0.9rem;

    span {
      font-weight: bold;
    }
  }
`;

interface Props {}

const ArticleInfo: FC<Props> = () => {
  return (
    <ArticleInfoWrap>
      <div>
        <Image src={author} alt=''></Image>
      </div>
      <p>
        By <span>John Doe</span>
      </p>
      <p>Posted: 12 Jul 2021 10:05 pm</p>
    </ArticleInfoWrap>
  );
};

export default ArticleInfo;

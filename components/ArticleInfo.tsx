import { FC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

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

interface Props {
  name: string;
  date: string;
  img: StaticImageData;
}

const ArticleInfo: FC<Props> = ({ name, date, img }) => {
  return (
    <ArticleInfoWrap>
      <div>
        <Image src={img} alt=''></Image>
      </div>
      <p>
        By <span>{name}</span>
      </p>
      <p>Posted:{date} </p>
    </ArticleInfoWrap>
  );
};

export default ArticleInfo;

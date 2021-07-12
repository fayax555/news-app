import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ArticleListWrap = styled.div`
  display: flex;
  padding: 3rem;

  > * {
    width: 300px;
    background-color: #f4f4f4;
    margin: 1rem;
    padding: 1rem;
  }

  a {
    font-size: 1.6rem;
    font-weight: bold;
  }

  p {
    padding-top: 1rem;
  }

  > div > div {
    cursor: pointer;
  }
`;

interface Props {}

const ArticleList: FC<Props> = () => {
  return (
    <ArticleListWrap>
      <div>
        <Link href='/news/' passHref>
          <div>
            <a>Heading 1</a>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
              neque.
            </p>
          </div>
        </Link>
      </div>
      <div>
        <Link href='/news/' passHref>
          <div>
            <a>Heading 2</a>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
              neque.
            </p>
          </div>
        </Link>
      </div>
    </ArticleListWrap>
  );
};

export default ArticleList;

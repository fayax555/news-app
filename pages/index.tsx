import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  > h1:hover,
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const NewsList = styled.div`
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
`;

export default function Home() {
  return (
    <Wrapper>
      <Link href='/' passHref>
        <h1>News App</h1>
      </Link>
      <NewsList>
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
      </NewsList>
    </Wrapper>
  );
}

import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Bar = styled.div`
  background-color: #111;
  min-height: 43px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1100px;
    padding: 0rem 2rem;
    margin: auto;
    color: #fff;
    text-align: right;

    h1 {
      font-size: 1.5rem;

      &:hover {
        cursor: pointer;
      }
    }

    > div {
      a {
        font-size: 0.8rem;
        padding-left: 1rem;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;

interface Props {}

const TopBar: FC<Props> = () => {
  return (
    <Bar>
      <div>
        <Link href='/' passHref>
          <a>
            <h1>News</h1>
          </a>
        </Link>
        <div>
          <Link href='/register' passHref>
            <a>Register</a>
          </Link>
          <Link href='/login' passHref>
            <a>Sign In</a>
          </Link>
        </div>
      </div>
    </Bar>
  );
};

export default TopBar;

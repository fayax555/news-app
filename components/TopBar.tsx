import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Bar = styled.div`
  background-color: #111;
  max-height: 40px;
  margin-bottom: 1rem;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1100px;
    padding: 0rem 2rem;
    margin: -0.3rem auto;
    color: #fff;
    text-align: right;

    h1 {
      font-size: 1.5rem;

      &:hover {
        cursor: pointer;
      }
    }

    a {
      font-size: 0.8rem;
    }
  }
`;

interface Props {}

const TopBar: FC<Props> = () => {
  return (
    <Bar>
      <div>
        <Link href='/' passHref>
          <h1>Newz</h1>
        </Link>
        <Link href='/login' passHref>
          <a>Sign In</a>
        </Link>
      </div>
    </Bar>
  );
};

export default TopBar;

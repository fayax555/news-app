import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import headerImg from 'assets/header.jpg';
import Link from 'next/link';

const Wrap = styled.a`
  position: relative;

  > * {
    position: absolute;
    z-index: 10;
  }

  > div {
    /* transform: translateY(-50px); */
    bottom: 0;
    padding: 1rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;

    h1 {
      font-size: 1.7rem;
    }

    p {
      font-size: 0.7rem;
    }

    span:first-child {
      font-weight: bold;
      padding-right: 0.5rem;
    }
  }
`;

interface Props {}

const Header: FC<Props> = () => {
  // first section of the main page
  return (
    <Link href='' passHref>
      <Wrap>
        <Image src={headerImg} width={1100} height={500} alt='' />
        <div>
          <h1>Create Device Mockups in Browser with DeviceMock</h1>
          <p>
            By <span>John Doe</span> <span>June 18, 2020</span>
          </p>
        </div>
      </Wrap>
    </Link>
  );
};

export default Header;

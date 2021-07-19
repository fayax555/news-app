import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import headerImg from 'assets/header.jpg';
import Link from 'next/link';

const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
`;

const HeaderLeft = styled.div`
  h1 {
    font-size: 1.5rem;
  }

  > a {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
    padding-top: 2rem;

    &:hover {
      text-decoration: underline;

      img {
        opacity: 0.8;
      }
    }

    h2 {
      font-size: 1rem;
      line-height: 1.4;
      color: #444;
    }
  }
`;

const LinkWrap = styled.a`
  position: relative;

  &:hover {
    img {
      opacity: 0.9;
    }

    h1 {
      text-decoration: underline;
    }
  }

  > * {
    position: absolute;
    z-index: 10;
  }

  > div {
    bottom: 0;
    padding: 0.2rem 0.5rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

interface Props {}

const Header: FC<Props> = () => {
  // first section of the main page
  return (
    <HeaderWrap>
      <HeaderLeft>
        <h1>Latest News</h1>
        <Link href='/news/id' passHref>
          <a>
            <Image src={headerImg} alt='' />
            <h2>Create Device Mockups in Browser with DeviceMock</h2>
          </a>
        </Link>
        <Link href='/news/id' passHref>
          <a>
            <Image src={headerImg} alt='' />
            <h2>Create Device Mockups in Browser with DeviceMock</h2>
          </a>
        </Link>
        <Link href='/news/id' passHref>
          <a>
            <Image src={headerImg} alt='' />
            <h2>Create Device Mockups in Browser with DeviceMock</h2>
          </a>
        </Link>
        <Link href='/news/id' passHref>
          <a>
            <Image src={headerImg} alt='' />
            <h2>Create Device Mockups in Browser with DeviceMock</h2>
          </a>
        </Link>
      </HeaderLeft>
      <Link href='/news/id' passHref>
        <LinkWrap>
          <Image src={headerImg} width={1100} height={700} alt='' />
          <div>
            <h1>Create Device Mockups in Browser with DeviceMock</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Temporibus nihil eos eum! Repellendus itaque quas quod.
            </p>
          </div>
        </LinkWrap>
      </Link>
    </HeaderWrap>
  );
};

export default Header;
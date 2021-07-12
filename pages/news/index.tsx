import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  > h1:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Index: FC = () => {
  return (
    <Wrapper>
      <Link href='/' passHref>
        <h1>News App</h1>
      </Link>
    </Wrapper>
  );
};

export default Index;

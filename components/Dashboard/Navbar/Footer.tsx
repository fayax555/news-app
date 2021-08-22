import { FC } from 'react';
import styled from 'styled-components';

const Wrap = styled.footer`
  display: flex;
  place-content: center;
  background-color: #000;
  color: #fff;
  padding: 2rem;
  margin-top: 10rem;
`;

interface Props {}

const Footer: FC<Props> = () => {
  return (
    <Wrap>
      <p>Copyright Newz 2021</p>
    </Wrap>
  );
};

export default Footer;

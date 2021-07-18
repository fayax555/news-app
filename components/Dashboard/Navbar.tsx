import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const DashboardWrap = styled.section``;

const List = styled.ul`
  li {
    padding-top: 1rem;
  }
`;

interface Props {}

const Navbar: FC<Props> = () => {
  return (
    <DashboardWrap>
      <h3>Dashbaord</h3>
      <List>
        <li>
          <Link href='/admin/dashboard/write'>
            <a>News</a>
          </Link>
        </li>
        <li>
          <Link href=''>
            <a>Comments</a>
          </Link>
        </li>
        <li>
          <Link href=''>
            <a>Users</a>
          </Link>
        </li>
        <li>
          <Link href=''>
            <a>Appearance</a>
          </Link>
        </li>
        <li>
          <Link href=''>
            <a>Settings</a>
          </Link>
        </li>
      </List>
    </DashboardWrap>
  );
};

export default Navbar;

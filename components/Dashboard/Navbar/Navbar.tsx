import { FC } from 'react';
import Link from 'next/link';
import { NavbarWrap, List } from '../../Styles/DashboardStyles';
import NavbarItem from './NavbarItem';

interface Props {}

const Navbar: FC<Props> = () => {
  const navItems = [
    {
      name: 'Articles',
      subItems: [
        { link: 'articles/all', name: 'All Articles' },
        { link: 'articles/write', name: 'Add New' },
        { link: 'articles/categories', name: 'Categories' },
      ],
    },
    {
      name: 'Comments',
      subItems: [{ link: 'comments/all', name: 'All Comments' }],
    },
    {
      name: 'Users',
      subItems: [
        { link: 'users/all', name: 'All users' },
        { link: 'users/addnew', name: 'Add New User' },
      ],
    },
    { name: 'Appearance' },
    { name: 'Settings' },
  ];

  return (
    <NavbarWrap>
      <Link href='/admin/dashboard' passHref>
        <a>
          <h3>Dashboard</h3>
        </a>
      </Link>
      <List>
        {navItems.map(({ name, subItems }) => (
          <NavbarItem key={name} props={{ name, subItems }} />
        ))}
      </List>
    </NavbarWrap>
  );
};

export default Navbar;

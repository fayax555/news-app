import { FC } from 'react';
import Link from 'next/link';
import { NavbarWrap, List } from '../../Styles/DashboardStyles';
import NavbarItem from './NavbarItem';

interface Props {}

const Navbar: FC<Props> = () => {
  const navItems = [
    {
      link: '',
      name: 'Articles',
      subItems: [
        { link: 'articles', name: 'All Articles' },
        { link: 'write', name: 'Add New' },
        { link: 'categories', name: 'Categories' },
      ],
    },
    {
      link: '',
      name: 'Comments',
      subItems: [{ link: 'comments', name: 'All Comments' }],
    },
    {
      link: '',
      name: 'Users',
      subItems: [
        { link: 'users', name: 'All users' },
        { link: 'addnewuser', name: 'Add New User' },
      ],
    },
    { link: '', name: 'Appearance' },
    { link: '', name: 'Settings' },
  ];

  return (
    <NavbarWrap>
      <Link href='/admin/dashboard' passHref>
        <h3>
          <a>Dashboard</a>
        </h3>
      </Link>
      <List>
        {navItems.map(({ link, name, subItems }) => (
          <NavbarItem key={name} props={{ link, name, subItems }} />
        ))}
      </List>
    </NavbarWrap>
  );
};

export default Navbar;

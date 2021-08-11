import { FC } from 'react';
import Link from 'next/link';
import { NavbarWrap, List } from '../Styles/DashboardStyles';

interface Props {}

const Navbar: FC<Props> = () => {
  const navItems = [
    {
      link: '',
      name: 'Articles',
      subItems: {
        sub1: { link: 'write', name: 'All Articles' },
        sub2: 'Add New',
        sub3: 'Categories',
      },
    },
    { link: '', name: 'Comments' },
    { link: '', name: 'Users' },
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
        {navItems.map(({ link, name }) => (
          <li key={name}>
            <Link href={`/admin/dashboard/${link}`} passHref>
              <a>{name}</a>
            </Link>
            <ul>
              <li>
                <Link href='/admin/dashboard'>
                  <a>Sub-1</a>
                </Link>
              </li>
              <li>
                <Link href='/admin/dashboard'>
                  <a>Sub-2</a>
                </Link>
              </li>
              <li>
                <Link href='/admin/dashboard'>
                  <a>Sub-3</a>
                </Link>
              </li>
            </ul>
          </li>
        ))}
      </List>
    </NavbarWrap>
  );
};

export default Navbar;

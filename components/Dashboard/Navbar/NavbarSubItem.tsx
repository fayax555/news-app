import { FC } from 'react';
import Link from 'next/link';

interface Props {
  name?: string;
  link?: string;
}

const NavbarSubItem: FC<Props> = ({ name, link }) => {
  return (
    <li key={name}>
      <Link href={`/admin/dashboard/${link}`}>
        <a>{name}</a>
      </Link>
    </li>
  );
};

export default NavbarSubItem;

import { FC } from 'react';
import Link from 'next/link';
import NavbarSubItem from './NavbarSubItem';

interface Props {
  props: {
    link: string;
    name: string;
    subItems?: {
      link: string;
      name: string;
    }[];
  };
}

const NavbarItem: FC<Props> = ({ props }) => {
  return (
    <li>
      <Link href={`/admin/dashboard/${props.link}`} passHref>
        <a>{props.name}</a>
      </Link>
      <ul>
        {props.subItems?.map(({ name, link }) => (
          <NavbarSubItem key={name} name={name} link={link} />
        ))}
      </ul>
    </li>
  );
};

export default NavbarItem;

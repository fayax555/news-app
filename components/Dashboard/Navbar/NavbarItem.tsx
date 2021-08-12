import { FC } from 'react';
import NavbarSubItem from './NavbarSubItem';

interface Props {
  props: {
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
      <a
        onClick={(e) => {
          e.preventDefault();
        }}
        href=''
      >
        {props.name}
      </a>
      <ul>
        {props.subItems?.map(({ name, link }) => (
          <NavbarSubItem key={name} name={name} link={link} />
        ))}
      </ul>
    </li>
  );
};

export default NavbarItem;

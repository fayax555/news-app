import { useRouter } from 'next/router';
import { FC } from 'react';
import NavbarSubItem from './NavbarSubItem';

interface Props {
  name: string;
  subItems?: {
    link: string;
    name: string;
  }[];
}

const NavbarItem: FC<Props> = ({ name, subItems }) => {
  const router = useRouter();

  const isPath = router.pathname.includes(name.toLowerCase());

  return (
    <li>
      <a
        onClick={(e) => {
          e.preventDefault();
        }}
        href=''
      >
        {name}
      </a>
      <ul style={{ display: isPath ? 'block' : 'none' }}>
        {subItems?.map((subItem) => (
          <NavbarSubItem key={subItem.name} {...subItem} />
        ))}
      </ul>
    </li>
  );
};

export default NavbarItem;

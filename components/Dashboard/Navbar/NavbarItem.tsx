import { useRouter } from 'next/router';
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
  const router = useRouter();

  const isPath = router.pathname.includes(props.name.toLowerCase());

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
      <ul style={{ display: isPath ? 'block' : 'none' }}>
        {props.subItems?.map(({ name, link }) => (
          <NavbarSubItem key={name} name={name} link={link} />
        ))}
      </ul>
    </li>
  );
};

export default NavbarItem;

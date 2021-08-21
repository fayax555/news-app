import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  name?: string;
  link?: string;
}

const NavbarSubItem: FC<Props> = ({ name, link }) => {
  const router = useRouter();

  console.log(router.pathname);
  console.log(name);

  return (
    <li key={name}>
      <Link href={`/admin/dashboard/${link}`}>
        <a>{name}</a>
      </Link>
    </li>
  );
};

export default NavbarSubItem;

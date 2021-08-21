import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  name?: string;
  link: string;
}

const NavbarSubItem: FC<Props> = ({ name, link }) => {
  const router = useRouter();

  const isPath = router.pathname.includes(link);

  return (
    <li style={{ backgroundColor: isPath ? '#243d81' : '' }} key={name}>
      <Link href={`/admin/dashboard/${link}`}>
        <a>{name}</a>
      </Link>
    </li>
  );
};

export default NavbarSubItem;

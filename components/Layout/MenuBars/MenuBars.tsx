import { FC } from 'react';
import Navbar from './Navbar';
import AdminBar from './AdminBar';
import { useSession } from 'next-auth/client';
import { Session } from 'next-auth';

interface Props {
  session?: Session | null;
}

const MenuBars: FC<Props> = () => {
  const [session] = useSession();

  return (
    <div>
      {session && <AdminBar />}
      <Navbar />
    </div>
  );
};

export default MenuBars;

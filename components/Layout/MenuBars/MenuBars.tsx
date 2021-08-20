import { FC } from 'react';
import Navbar from './Navbar';
import AdminBar from './AdminBar';
import { GetServerSideProps } from 'next';
// import { Session } from 'next-auth';
import { useSession, getSession } from 'next-auth/client';

interface Props {
  session?: any;
}

const MenuBars: FC<Props> = () => {
  const [session, loading] = useSession();

  return (
    <div>
      {session && <AdminBar />}
      <Navbar />
    </div>
  );
};

export default MenuBars;

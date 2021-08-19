import { FC } from 'react';
import Navbar from './Navbar';
import { getSession } from 'next-auth/client';
import AdminBar from './AdminBar';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

interface Props {
  session?: Session | null;
}

const MenuBars: FC<Props> = ({ session }) => {
  console.log(session);

  return (
    <div>
      {session && <AdminBar />}
      <Navbar />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  return { props: { session } };
};

export default MenuBars;

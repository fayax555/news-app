import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { getSession, signOut } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

const Bar = styled.div`
  background-color: #111;
  min-height: 43px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1100px;
    padding: 0rem 2rem;
    margin: auto;
    color: #fff;
    text-align: right;

    h1 {
      font-size: 1.5rem;

      &:hover {
        cursor: pointer;
      }
    }

    > div {
      a {
        font-size: 0.8rem;
        padding-left: 1rem;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;

interface Props {
  session?: Session | null;
}

const Navbar: FC<Props> = ({ session }) => {
  // const [session, loading] = useSession();
  console.log(session);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <Bar>
      <div>
        <Link href='/' passHref>
          <a>
            <h1>News</h1>
          </a>
        </Link>
        <div>
          {!session ? (
            <>
              <Link href='/register' passHref>
                <a>Register</a>
              </Link>
              <Link href='/login' passHref>
                <a>Sign In</a>
              </Link>
            </>
          ) : (
            <a onClick={logoutHandler}>Logout</a>
          )}
        </div>
      </div>
    </Bar>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  return { props: { session } };
};

export default Navbar;

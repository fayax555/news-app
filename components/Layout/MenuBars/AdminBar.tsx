import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { max_width } from 'components/Styles/Styles';

const StyledAdminBar = styled.section`
  display: flex;
  justify-content: space-between;
  margin: auto;
  ${max_width};

  > div {
    display: flex;
    gap: 3rem;
  }
`;

interface Props {}

const AdminBar: FC<Props> = () => {
  const router = useRouter();

  const [session] = useSession();

  const path = window.location.pathname;
  const nid = path.replace('/news/', '');

  const handleClick = () => {
    router.push({
      pathname: '/admin/dashboard/articles/write',
      query: { id: nid },
    });
  };

  return (
    <StyledAdminBar>
      <Link href='/admin/dashboard'>
        <a style={{ alignSelf: 'start' }}>Go to Dashboard</a>
      </Link>
      <div>
        {path.includes('/news/') && (
          <a onClick={() => handleClick()}>Edit this Article</a>
        )}
        <p>Hello, {session?.user?.name}</p>
      </div>
    </StyledAdminBar>
  );
};

export default AdminBar;

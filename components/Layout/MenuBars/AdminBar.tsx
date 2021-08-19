import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledAdminBar = styled.section`
  display: flex;
  justify-content: space-around;
`;

interface Props {}

const AdminBar: FC<Props> = () => {
  return (
    <StyledAdminBar>
      <Link href='/admin/dashboard'>Go to Dashboard</Link>
      <Link href='/admin/dashboard/articles/write'>Edit this Article</Link>
    </StyledAdminBar>
  );
};

export default AdminBar;

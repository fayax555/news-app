import { FC } from 'react';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Dashboard/Navbar';
import styled from 'styled-components';

const DashBoardWrap = styled.div``;

interface Props {}

const Dashboard: FC<Props> = () => {
  return (
    <Layout>
      <DashBoardWrap>
        <Navbar />
      </DashBoardWrap>
    </Layout>
  );
};

export default Dashboard;

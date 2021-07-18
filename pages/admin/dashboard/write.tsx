import { FC } from 'react';
import Editor from 'components/Dashboard/Editor';
import Layout from 'components/Layout/Layout';

interface Props {}

const Write: FC<Props> = () => {
  return (
    <Layout title='Add New Article'>
      <Editor />
    </Layout>
  );
};

export default Write;

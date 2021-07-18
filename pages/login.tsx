import { FC, useState } from 'react';
import Form from 'components/Form/Form';
import Layout from 'components/Layout/Layout';
import { PageHeading } from '@/components/Styles/Styles';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formData = [
    { label: 'email', val: email, setVal: setEmail },
    { label: 'password', val: password, setVal: setPassword },
  ];

  return (
    <Layout title='Sign In'>
      <PageHeading>Sign In</PageHeading>
      <Form btnName='Sign In' formData={formData} />
    </Layout>
  );
};

export default Login;

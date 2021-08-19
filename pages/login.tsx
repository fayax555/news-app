import { FC, FormEvent, useState } from 'react';
import Form from 'components/Form/Form';
import Layout from 'components/Layout/Layout';
import { PageHeading } from 'components/Styles/Styles';
import { signIn } from 'next-auth/client';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formData = [
    { label: 'email', val: email, setVal: setEmail },
    { label: 'password', val: password, setVal: setPassword },
  ];

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {

    console.log('login button click');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    console.log(result);

    if (result?.error) alert(result?.error);
  };

  return (
    <Layout title='Sign In'>
      <PageHeading>Sign In</PageHeading>
      <Form
        handleLoginSubmit={handleLoginSubmit}
        btnName='Sign In'
        formData={formData}
      />
    </Layout>
  );
};

export default Login;

import { FC, FormEvent, useState } from 'react';
import Form from 'components/Form/Form';
import Layout from 'components/Layout/Layout';
import { PageHeading } from 'components/Styles/Styles';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const Login: FC = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (session) {
    router.replace('/admin/dashboard');
  }

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

    if (!result?.error) router.replace('admin/dashboard/');

    if (result?.error) alert(result?.error);
  };

  return (
    <>
      {!session && !loading && (
        <Layout title='Sign In'>
          <PageHeading>Sign In</PageHeading>
          <Form
            handleLoginSubmit={handleLoginSubmit}
            btnName='Sign In'
            formData={formData}
          />
        </Layout>
      )}
    </>
  );
};

export default Login;

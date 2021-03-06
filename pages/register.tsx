import { FC, FormEvent, useState } from 'react';
import Form from 'components/Form/Form';
import Layout from 'components/Layout/Layout';
import { PageHeading } from 'components/Styles/Styles';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const Register: FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (session) {
    router.replace('/');
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const formData = [
    { label: 'name', val: name, setVal: setName },
    { label: 'email', val: email, setVal: setEmail },
    { label: 'password', val: password, setVal: setPassword },
    {
      label: 'confirm Password',
      val: confirmPassword,
      setVal: setConfirmPassword,
    },
  ];

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirmPassword }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Sign Up Successful') {
          alert(data.message);
          return router.replace('/');
        }

        alert(data.message);
      });
  };

  return (
    <>
      {!loading && !session && (
        <Layout title='Sign Up'>
          <PageHeading>Sign Up</PageHeading>
          <Form
            handleRegisterSubmit={(e) => handleRegisterSubmit(e)}
            btnName='Sign Up'
            formData={formData}
          />
        </Layout>
      )}
    </>
  );
};

export default Register;

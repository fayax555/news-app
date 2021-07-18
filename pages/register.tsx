import { FC, useState } from 'react';
import Form from 'components/Form/Form';
import Layout from 'components/Layout/Layout';
import { PageHeading } from 'components/Styles/Styles';

const Register: FC = () => {
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

  return (
    <Layout title='Sign Up'>
      <PageHeading>Sign Up</PageHeading>
      <Form btnName='Sign Up' formData={formData} />
    </Layout>
  );
};

export default Register;

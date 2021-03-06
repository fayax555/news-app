import { FC, Dispatch, SetStateAction, FormEvent } from 'react';
import FormEl from './FormEl';
import styled from 'styled-components';
import { Button, LinkBtn } from '../Styles/Styles';

const FormWrap = styled.div`
  display: grid;
  margin: auto;
  max-width: 1100px;
`;

const StyledForm = styled.form`
  font-size: 1.1rem;
  width: 23rem;
  align-self: center;
  justify-self: center;
  padding-bottom: 1rem;
`;

const FormButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

interface Props {
  setScreen?: Dispatch<SetStateAction<string>>;
  btnName?: string;
  formName?: string;
  formData: {
    label: string;
    val: string | number;
    setVal: Dispatch<SetStateAction<string>>;
    isRequired?: boolean;
  }[];
  handleRegisterSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  handleLoginSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<Props> = ({
  formData,
  handleRegisterSubmit,
  handleLoginSubmit,
  btnName,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if the state of input fields are cleared
    // the confirmation screen will not receive those data.
    // setScreen is only for Sign Up Form,
    // the app will break if it is not within the if statement
    if (btnName === 'Sign Up' && handleRegisterSubmit) {
      return handleRegisterSubmit(e);
    }

    if (btnName === 'Sign In' && handleLoginSubmit) {
      return handleLoginSubmit(e);
    }
    // else {
    //   formData.forEach((data) => data.setVal(''));
    // }
  };

  return (
    <FormWrap>
      <StyledForm onSubmit={handleSubmit}>
        {formData.map((data) => (
          <FormEl key={data.label} {...data} />
        ))}
        <FormButton type='submit'>{btnName || 'Submit'}</FormButton>
      </StyledForm>
    </FormWrap>
  );
};

export default Form;

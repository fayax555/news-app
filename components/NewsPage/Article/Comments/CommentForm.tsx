import { ChangeEvent, FC, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Styles/Styles';
import Input from 'components/Form/FormEl';

const StyledCommentForm = styled.form`
  padding-top: 4rem;

  input,
  textarea {
    display: block;
    font-size: 1rem;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    width: 87%;
    border-radius: 5px;
    border: 1px solid #444;
  }

  textarea {
    font-size: 1.03rem;
  }
`;

interface Props {}

const CommentForm: FC<Props> = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');


  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StyledCommentForm onSubmit={handleSubmit}>
      <Input val={name} setVal={setName} ph='Name' />
      <textarea onChange={handleComment} rows={6} placeholder='Comment' />
      <Button w='20%'>Send</Button>
    </StyledCommentForm>
  );
};

export default CommentForm;

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
    max-width: 87%;
    border-radius: 5px;
    border: 1px solid #444;
  }

  textarea {
    font-size: 1.04rem;
  }
`;

interface Props {
  _id: string;
}

const CommentForm: FC<Props> = ({ _id }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = { _id, name, comment };
    // console.log(commentData);

    fetch(`/api/comment/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setName('');
        setComment('');
      });
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

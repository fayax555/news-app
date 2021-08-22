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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = { _id, name, comment };

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
      <textarea
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        rows={6}
        placeholder='Comment'
      />
      <Button w='20%'>Send</Button>
    </StyledCommentForm>
  );
};

export default CommentForm;

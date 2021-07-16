import { FC, useRef, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { NewsWrap, FormWrap } from 'components/ArticleStyles';
import { useRouter } from 'next/router';

interface Props {}

const Write: FC<Props> = () => {
  const titleInputRef = useRef<any>();
  const bodyInputRef = useRef<any>();
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setIsSubmit(true);

    const inputTitle = titleInputRef.current.value;
    const inputBody = bodyInputRef.current.value;

    const reqBody = { newsTitle: inputTitle, newsBody: inputBody };

    fetch('/api/articles', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <NewsWrap>
      <h1
        onClick={() => {
          router.push('/');
        }}
      >
        News
      </h1>
      <FormWrap>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title'>Title</label>
            <input id='title' type='text' ref={titleInputRef} required />
          </div>
          <div>
            <label htmlFor='body'>Body</label>
            <textarea
              id='body'
              cols={65}
              rows={15}
              ref={bodyInputRef}
              required
            ></textarea>
          </div>
          <button disabled={isSubmit} type='submit'>
            Submit
          </button>
        </form>
      </FormWrap>
    </NewsWrap>
  );
};

export default Write;

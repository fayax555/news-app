import { FC, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { NewsWrap, FormWrap } from 'components/ArticleStyles';
import { useRouter } from 'next/router';

interface Props {}

const Write: FC<Props> = () => {
  const titleInputRef = useRef<any>();
  const bodyInputRef = useRef<any>();

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const inputTitle = titleInputRef.current.value;
    const inputBody = bodyInputRef.current.value;

    const reqBody = { newsTitle: inputTitle, newsBody: inputBody };

    fetch('/api/articles', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    router.push('/');
  };

  return (
    <NewsWrap>
      <Link href='/' passHref>
        <h1>News</h1>
      </Link>
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
          <button type='submit'>Submit</button>
        </form>
      </FormWrap>
    </NewsWrap>
  );
};

export default Write;

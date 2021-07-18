import { FC, useRef, useState } from 'react';
import { FormWrap } from 'components/Styles/ArticleStyles';

interface Props {}

const Editor: FC<Props> = () => {
  const titleInputRef = useRef<any>();
  const bodyInputRef = useRef<any>();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e: any) => {
    console.log('form submitted');
    e.preventDefault();

    setIsSubmit(true);

    const inputTitle = titleInputRef.current.value.trim();
    const inputBody = bodyInputRef.current.value.trim();

    const reqBody = { title: inputTitle, body: inputBody };

    const res = await fetch('/api/articles', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);
    // .then((res) => res.json())
    // .then((data) => console.log(data));
  };

  return (
    <div>
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
    </div>
  );
};

export default Editor;

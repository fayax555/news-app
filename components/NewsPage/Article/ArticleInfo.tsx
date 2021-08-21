import dayjs from 'dayjs';
import { FC } from 'react';
import styled from 'styled-components';

const ArticleInfoWrap = styled.section`
  display: flex;
  max-width: 700px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  gap: 0.5rem;
  padding: 0.25rem 0;
  padding-bottom: 0.75rem;

  div {
    border-radius: 50%;
  }

  p {
    font-size: 0.9rem;

    span {
      font-weight: bold;
    }
  }
`;

interface Props {
  author?: string;
  _id: string;
}

const ArticleInfo: FC<Props> = ({ author, _id }) => {
  const dateFromObjectId = (id: string) =>
    new Date(parseInt(id.substring(0, 8), 16) * 1000);

  const date = dayjs(dateFromObjectId(_id));

  return (
    <ArticleInfoWrap>
      {/* <div>
        <Image src={img} alt=''></Image>
      </div> */}
      <>
        {author && author?.length > 0 && (
          <p>
            By <span>{author}</span>
            &nbsp;
          </p>
        )}
      </>
      <p>Posted: {date.format('DD MMM YY - HH:mm')} </p>
    </ArticleInfoWrap>
  );
};

export default ArticleInfo;

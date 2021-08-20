import dayjs from 'dayjs';
import { FC } from 'react';
import styled from 'styled-components';

const ArticleInfoWrap = styled.div`
  display: flex;
  border-bottom: 1px solid #444;
  align-items: center;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  gap: 0.5rem;
  /* padding: 0.25rem !important; */

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
  name?: string;
  _id: string;
}

const ArticleInfo: FC<Props> = ({ name, _id }) => {
  const dateFromObjectId = (id: string) =>
    new Date(parseInt(id.substring(0, 8), 16) * 1000);

  const date = dayjs(dateFromObjectId(_id));

  return (
    <ArticleInfoWrap>
      {/* <div>
        <Image src={img} alt=''></Image>
      </div> */}
      <p>
        By <span>{name || 'Hassan Fayaz'}</span>
      </p>
      &nbsp;
      <p>Posted: {date.format('DD MMM YY - HH:mm')} </p>
    </ArticleInfoWrap>
  );
};

export default ArticleInfo;

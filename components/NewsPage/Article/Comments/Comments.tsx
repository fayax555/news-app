import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Comment } from 'components/NewsPage/ArticleTypes';

const StyledList = styled.li`
  padding: 1rem;
  margin: 1.5rem 0;
  background-color: #eee;
  width: 87.4%;
  border-radius: 5px;

  div {
    padding-bottom: 1rem;

    p {
      &:first-child {
        font-weight: 600;
      }

      &:nth-child(2) {
        font-weight: normal;
        font-size: 0.7rem;
      }
    }
  }
`;

interface Props {
  comments: Comment[];
}

const Comments: FC<Props> = ({ comments }) => {
  return (
    <div>
      <h3 style={{ paddingTop: '2rem' }}>Comments</h3>
      <ul>
        {comments.map(({ cid, name, comment, createdAt }) => (
          <StyledList key={cid}>
            <div>
              <p>{name}</p>
              <p>{dayjs(createdAt).format('DD MMM YY')}</p>
            </div>
            <p>{comment}</p>
          </StyledList>
        ))}
      </ul>
    </div>
  );
};

export default Comments;

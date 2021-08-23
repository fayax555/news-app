import { UpdatedComment } from 'components/NewsPage/ArticleTypes';
import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { StyledLink } from '../Articles/ArticleList/styles';
import dayjs from 'dayjs';

const TableRow = styled.ul`
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: 3fr 2fr 1fr 1fr;
  gap: 5rem;
  border-bottom: 1px dashed #aaa;
  padding: 1.5rem 1rem 1rem;

  > li {
  }
`;

const TableRowHeader = styled(TableRow)`
  background-color: #ddd;
  font-weight: bold;
`;

interface Props {
  comments?: UpdatedComment[];
}

const CommentList: FC<Props> = ({ comments }) => {
  console.log(comments);

  return (
    <div>
      <ul>
        <li>
          <TableRowHeader>
            <li>Comments</li>
            <li>Article Title</li>
            <li>Status</li>
            <li>Date</li>
          </TableRowHeader>
        </li>

        {comments
          ?.reverse()
          .map(({ cid, comment, headline, status, createdAt, nid }) => (
            <li key={cid}>
              <TableRow>
                <li>{comment}</li>
                <li>
                  <Link href={`/news/${nid}`} passHref>
                    <StyledLink target='_blank'>
                      {headline.slice(0, 30)}...
                    </StyledLink>
                  </Link>
                </li>
                <li>{status}</li>
                <li>
                  <div>
                    <p>{dayjs(createdAt).format('DD/MM/YY')}</p>
                    <p>{dayjs(createdAt).format('HH:mm:ss')}</p>
                  </div>
                </li>
              </TableRow>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentList;

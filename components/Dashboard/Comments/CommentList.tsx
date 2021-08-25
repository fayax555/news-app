import { UpdatedComment } from 'components/NewsPage/ArticleTypes';
import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { StyledLink, IconsWrap } from '../Articles/ArticleList/Styles';
import dayjs from 'dayjs';
import { FaTrash, FaBan, FaRegCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

const TableRow = styled.ul`
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: 3fr 1fr 2fr 1fr 1fr;
  gap: 5rem;
  border-bottom: 3px dashed #444;
  padding: 1.5rem 1rem 1rem;

  &:hover {
    li:first-child div {
      display: flex;
    }
  }

  > li {
    padding-bottom: 1.75rem;
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
  const router = useRouter();

  if (!comments) return null;

  comments.sort(function (a, b) {
    return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
  });

  const handleApprove = (id: string) => {
    fetch(`/api/comment/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'approved' }),
    })
      .then((res) => res.json())
      .then(({ message }) => {
        router.push(window.location.pathname);
        alert(message);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`/api/comment/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ message }) => {
        router.push(window.location.pathname);
        alert(message);
      });
  };

  return (
    <div>
      <ul>
        <li>
          <TableRowHeader>
            <li>Comments</li>
            <li>Name</li>
            <li>Article Title</li>
            <li>Status</li>
            <li>Date</li>
          </TableRowHeader>
        </li>

        {comments
          .reverse()
          .map(({ cid, comment, name, headline, status, createdAt, nid }) => (
            <li key={cid}>
              <TableRow>
                <li>
                  {comment}
                  <IconsWrap c1='#198005' c2='#9b6a10' c3='#8d1111'>
                    <FaRegCheckCircle
                      onClick={() => {
                        handleApprove(cid);
                      }}
                    />
                    <FaBan />
                    <FaTrash
                      onClick={() => {
                        handleDelete(cid);
                      }}
                    />
                  </IconsWrap>
                </li>
                <li>{name}</li>
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
                    <p>{dayjs(createdAt).format('DD MMM YY')}</p>
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

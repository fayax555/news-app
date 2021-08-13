import { Article } from 'components/NewsPage/ArticleTypes';
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import Link from 'next/link';
import dayjs from 'dayjs';

const TableBodyField = styled.ul`
  border-bottom: 1px dashed #777;
  padding-bottom: 2rem;

  &:hover {
    li:nth-child(2) > div {
      display: flex;
    }
  }

  li:nth-child(2) {
    a {
      color: #1d1d97;

      &:hover {
        color: #7070f3;
      }
    }

    div {
      display: none;
      position: absolute;

      > * {
        margin: 0.5rem 1rem;
        font-size: 1.3rem;

        &:hover {
          cursor: pointer;
          color: blue;
        }
      }
    }
  }

  li:last-child div {
    position: absolute;
  }
`;

interface Props {
  _id: string;
  nid: string;
  headline: string;
  isColChecked: boolean;
  articleList: Article[];
  setArticleList: Dispatch<SetStateAction<Article[]>>;
}

const ArticleListTableField: FC<Props> = ({
  _id,
  nid,
  headline,
  isColChecked,
  articleList,
  setArticleList,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const dateFromObjectId = (id: string) =>
    new Date(parseInt(id.substring(0, 8), 16) * 1000);

  const date = dayjs(dateFromObjectId(_id));

  useEffect(() => {
    if (isColChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [isColChecked]);

  const handleCheckBox = () => {
    setIsChecked((curr) => !curr);
  };

  const handleDelete = (articleId: string) => {
    const updatedList = articleList.filter(({ nid }) => nid !== articleId);
    setArticleList(updatedList);
  };

  return (
    <TableBodyField>
      <li>
        <input type='checkbox' checked={isChecked} onChange={handleCheckBox} />
      </li>
      <li>
        <Link href={`/news/${nid}`}>
          <a target='_blank'>{headline}</a>
        </Link>
        <div>
          <FaEdit />
          <FaTrash
            onClick={() => {
              handleDelete(nid);
            }}
          />
        </div>
      </li>
      <li>John Doe</li>
      <li>General</li>
      <li>
        <div>
          <p>{date.format('DD/MM/YY')}</p>
          <p>{date.format('HH:mm:ss')}</p>
        </div>
      </li>
    </TableBodyField>
  );
};

export default ArticleListTableField;

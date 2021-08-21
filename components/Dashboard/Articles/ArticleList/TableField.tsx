import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import Link from 'next/link';
import dayjs from 'dayjs';
import Router from 'next/router';
import { useRouter } from 'next/router';

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
        cursor: pointer;

        &:first-child:hover {
          color: #0f0fc2;
        }

        &:nth-child(2):hover {
          color: #9b1010;
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
  setCheckedList: Dispatch<SetStateAction<string[]>>;
}

const ArticleListTableField: FC<Props> = ({
  _id,
  nid,
  headline,
  isColChecked,
  setCheckedList,
}) => {
  const router = useRouter();

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

  const handleCheckBox = (id: string) => {
    setIsChecked((curr) => !curr);

    if (!isChecked) {
      setCheckedList((curr: string[]) => [...new Set([...curr, id])]);
    } else {
      setCheckedList((curr: string[]) => curr.filter((c: string) => c !== id));
    }
  };

  const handleDelete = (id: string) => {
    fetch(`/api/article/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Router.push(window.location.pathname);

        alert(data.message);
      });
  };

  const handleEdit = (id: string) => {
    router.push({
      pathname: '/admin/dashboard/articles/write',
      query: { id },
    });
  };

  return (
    <TableBodyField>
      <li>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={() => handleCheckBox(_id)}
        />
      </li>
      <li>
        <Link href={`/news/${nid}`}>
          <a target='_blank'>{headline}</a>
        </Link>
        <div>
          <FaEdit
            onClick={() => {
              handleEdit(nid);
            }}
          />
          <FaTrash
            onClick={() => {
              handleDelete(_id);
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

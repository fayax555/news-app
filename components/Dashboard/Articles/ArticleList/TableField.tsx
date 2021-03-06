import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { TableBodyField, StyledLink, IconsWrap } from './Styles';

interface Props {
  _id: string;
  nid: string;
  headline: string;
  views?: number;
  author?: string;
  isColChecked: boolean;
  setCheckedList: Dispatch<SetStateAction<string[]>>;
}

const ArticleListTableField: FC<Props> = ({
  _id,
  nid,
  headline,
  views,
  author,
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
        router.push(window.location.pathname);

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
        <Link href={`/news/${nid}`} passHref>
          <StyledLink target='_blank'>{headline}</StyledLink>
        </Link>
        <IconsWrap c1='#1e6cb4' c2='#8d1111'>
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
        </IconsWrap>
      </li>
      <li>{author}</li>
      <li>{views}</li>
      <li>
        <div>
          <p>{date.format('DD MMM YY')}</p>
          <p>{date.format('HH:mm:ss')}</p>
        </div>
      </li>
    </TableBodyField>
  );
};

export default ArticleListTableField;

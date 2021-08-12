import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

const TableBodyField = styled.ul`
  border-bottom: 1px dashed #777;
  padding-bottom: 2rem;

  &:hover {
    li:nth-child(2) > div {
      display: flex;
    }
  }

  li:nth-child(2) {
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
`;

type tableField = {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string;
  date: string;
};

interface Props {
  tableFields: tableField;
  isColChecked: boolean;
  articleList: tableField[];
  setArticleList: Dispatch<SetStateAction<tableField[]>>;
}

const ArticleListTableField: FC<Props> = ({
  tableFields,
  isColChecked,
  articleList,
  setArticleList,
}) => {
  const { id, title, author, category, tags, date } = tableFields;

  const [isChecked, setIsChecked] = useState(false);

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
    const updatedList = articleList.filter(({ id }) => id !== articleId);
    setArticleList(updatedList);
  };

  return (
    <TableBodyField>
      <li>
        <input type='checkbox' checked={isChecked} onChange={handleCheckBox} />
      </li>
      <li>
        {title}
        <div>
          <FaEdit />
          <FaTrash
            onClick={() => {
              handleDelete(id);
            }}
          />
        </div>
      </li>
      <li>{author}</li>
      <li>{category}</li>
      <li>{tags}</li>
      <li>{date}</li>
    </TableBodyField>
  );
};

export default ArticleListTableField;

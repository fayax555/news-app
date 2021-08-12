import { FC, useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

const TableBodyField = styled.ul`
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

interface Props {
  tableFields: {
    title: string;
    author: string;
    category: string;
    tags: string;
    date: string;
  };

  isColChecked: boolean;
}

const ArticleListTableField: FC<Props> = ({ tableFields, isColChecked }) => {
  const { title, author, category, tags, date } = tableFields;

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

  return (
    <TableBodyField
      style={{ borderBottom: '1px solid #777', paddingBottom: '1.75rem' }}
    >
      <li>
        <input type='checkbox' checked={isChecked} onChange={handleCheckBox} />
      </li>
      <li>
        {title}
        <div>
          <FaEdit />
          <FaTrash />
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

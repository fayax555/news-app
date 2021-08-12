import { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';

interface Props {
  tableFields: {
    title: string;
    author: string;
    categories: string;
    tags: string;
    date: string;
  };
}

export const TableBody = styled.div`
  li {
    text-align: left;
  }
`;

const ArticleListTableField: FC<Props> = ({ tableFields }) => {
  const { title, author, categories, tags, date } = tableFields;

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked((curr) => !curr);
  };

  return (
    <TableBody>
      <li>
        <input type='checkbox' checked={isChecked} onChange={handleCheckBox} />
      </li>
      <li>{title}</li>
      <li>{author}</li>
      <li>{categories}</li>
      <li>{tags}</li>
      <li>{date}</li>
    </TableBody>
  );
};

export default ArticleListTableField;

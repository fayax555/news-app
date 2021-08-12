import { FC, useState } from 'react';
import styled from 'styled-components';
import { articleListData } from './articleListData';
import ArticleListTableField from './ArticleListTableField';

const Table = styled.section`
  display: grid;
  justify-content: center;
  font-size: 1.2rem;

  li {
    text-align: center;
    padding: 0.5rem;
  }

  > ul:first-child,
  div > ul {
    display: grid;
    grid-template-columns: 0.4fr 3fr 1.2fr 1.2fr 1fr 1fr;
    justify-items: start;

    li:first-child {
      justify-self: end;

      input {
        width: 1.3rem;
        height: 1.3rem;
        margin-top: 0.5rem;
      }
    }
  }
`;

export const TableHead = styled.ul`
  font-weight: bold;
  background-color: #ddd;
`;

interface Props {}

const ArticleListTable: FC<Props> = () => {
  const [isColChecked, setIsColChecked] = useState(false);

  return (
    <Table>
      <TableHead>
        <li>
          <input
            type='checkbox'
            checked={isColChecked}
            onChange={() => setIsColChecked((curr) => !curr)}
          />
        </li>
        <li>Title</li>
        <li>Author</li>
        <li>Category</li>
        <li>Tags</li>
        <li>Date</li>
      </TableHead>
      <div>
        {articleListData.map((tableFields, i) => (
          <ArticleListTableField
            key={i}
            tableFields={tableFields}
            isColChecked={isColChecked}
          />
        ))}
      </div>
    </Table>
  );
};

export default ArticleListTable;

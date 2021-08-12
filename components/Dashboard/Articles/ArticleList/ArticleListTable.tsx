import { FC } from 'react';
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

  > div:first-child, div>div {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr;
    justify-items: start;
  }
`;

export const TableHead = styled.div`
  font-weight: bold;
`;

interface Props {}

const ArticleListTable: FC<Props> = () => {
  return (
    <Table>
      <TableHead>
        <li>
          <input type='checkbox' />
        </li>
        <li>Title</li>
        <li>Author</li>
        <li>Categories</li>
        <li>Tags</li>
        <li>Date</li>
      </TableHead>
      <div>
        {articleListData.map((tableFields, i) => (
          <ArticleListTableField key={i} tableFields={tableFields} />
        ))}
      </div>
    </Table>
  );
};

export default ArticleListTable;

import { Dispatch, FC, SetStateAction } from 'react';
import { Article } from 'components/NewsPage/ArticleTypes';
import styled from 'styled-components';
import ArticleListTableField from './TableField';
import { Table } from './Styles';

export const TableHead = styled.ul`
  font-weight: bold;
  background-color: #ddd;
`;

interface Props {
  articles: Article[];
  setCheckedList: Dispatch<SetStateAction<string[]>>;
  isColChecked: boolean;
  setIsColChecked: Dispatch<SetStateAction<boolean>>;
}

const ArticleListTable: FC<Props> = ({
  articles,
  setCheckedList,
  isColChecked,
  setIsColChecked,
}) => {
  return (
    <Table>
      <TableHead>
        <li>
          <input
            type='checkbox'
            checked={isColChecked}
            onChange={() => setIsColChecked((curr: any) => !curr)}
          />
        </li>
        <li>Title</li>
        <li>Author</li>
        <li>Views</li>
        <li>Date</li>
      </TableHead>
      <div>
        {articles.map((article) => {
          return (
            <ArticleListTableField
              {...article}
              key={article._id}
              isColChecked={isColChecked}
              setCheckedList={setCheckedList}
            />
          );
        })}
      </div>
    </Table>
  );
};

export default ArticleListTable;

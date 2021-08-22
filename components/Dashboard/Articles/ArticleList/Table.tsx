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
        {articles.map(({ _id, nid, headline, views, author }) => {
          return (
            <ArticleListTableField
              key={_id}
              _id={_id}
              nid={nid}
              headline={headline}
              views={views || 0}
              author={author}
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

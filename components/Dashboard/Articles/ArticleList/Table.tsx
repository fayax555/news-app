import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Article } from 'components/NewsPage/ArticleTypes';
import styled from 'styled-components';
import ArticleListTableField from './TableField';

const Table = styled.section`
  display: grid;
  justify-content: center;
  font-size: 1.2rem;

  li {
    padding: 0.5rem;
  }

  > ul:first-child,
  div > ul {
    display: grid;
    grid-template-columns: 0.4fr 3fr 1.2fr 1.2fr 1fr;
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

interface Props {
  articles: Article[];
  setCheckedList: Dispatch<SetStateAction<string[]>>;
  isColChecked: any;
  setIsColChecked: any;
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
        <li>Category</li>
        <li>Date</li>
      </TableHead>
      <div>
        {articles.map(({ _id, nid, headline }) => {
          return (
            <ArticleListTableField
              key={_id}
              _id={_id}
              nid={nid}
              headline={headline}
              isColChecked={isColChecked}
              setIsColChecked={setIsColChecked}
              setCheckedList={setCheckedList}
            />
          );
        })}
      </div>
    </Table>
  );
};

export default ArticleListTable;

import { FC } from 'react';
import ArticleListTable from './ArticleListTable';
import styled from 'styled-components';

interface Props {}

const ArticleList: FC<Props> = () => {
  return (
    <div>
      <h2>Articles</h2>
      <ArticleListTable />
    </div>
  );
};

export default ArticleList;

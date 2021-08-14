import { FC, useState } from 'react';
import ArticleListTable from './Table';
import { Article } from 'components/NewsPage/ArticleTypes';
import styled from 'styled-components';
import Router from 'next/router';

const ArticleBar = styled.div`
  padding: 0.75rem;
  margin: 0.5rem 0;
  background-color: #aaa;
  display: flex;
  gap: 1rem;
  justify-content: space-around;

  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

interface Props {
  articles: Article[];
}

const ArticleList: FC<Props> = ({ articles }) => {
  const [checked, setChecked] = useState([]);

  const handleDeleteMany = () => {
    fetch(`/api/deleteMany`, {
      method: 'DELETE',
      body: JSON.stringify(checked),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);

        Router.push(window.location.pathname);
      });
  };

  return (
    <div>
      <h2>Articles</h2>
      <ArticleBar>
        <button onClick={handleDeleteMany}>Delete</button>
        <button>Filter</button>
      </ArticleBar>
      <ArticleListTable setChecked={setChecked} articles={articles} />
    </div>
  );
};

export default ArticleList;

import { FC, useEffect, useState } from 'react';
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
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isColChecked, setIsColChecked] = useState(false);

  console.log(checkedList);

  useEffect(() => {
    if (isColChecked) {
      const ids = articles.map((article) => article._id);
      setCheckedList([...new Set(ids)]);
    } else {
      setCheckedList([]);
    }
  }, [articles, isColChecked]);

  const handleDeleteMany = () => {
    fetch(`/api/deleteMany`, {
      method: 'DELETE',
      body: JSON.stringify([...new Set(checkedList)]),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);

        setIsColChecked(false);

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
      <ArticleListTable
        isColChecked={isColChecked}
        setIsColChecked={setIsColChecked}
        setCheckedList={setCheckedList}
        articles={articles}
      />
    </div>
  );
};

export default ArticleList;

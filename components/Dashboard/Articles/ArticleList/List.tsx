import { FC } from 'react';
import ArticleListTable from './Table';
import { Article } from 'components/NewsPage/ArticleTypes';
import styled from 'styled-components';

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
  return (
    <div>
      <h2>Articles</h2>
      <ArticleBar>
        <button
          onClick={() => {
            fetch(`/api/deleteMany`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((res) => res.json())
              .then((data) => {
                alert(data.message);
              });
          }}
        >
          Delete
        </button>
        <button>Filter</button>
      </ArticleBar>
      <ArticleListTable articles={articles} />
    </div>
  );
};

export default ArticleList;

import { FC, useEffect, useState } from 'react';
import ArticleListTable from './Table';
import { Article } from 'components/NewsPage/ArticleTypes';
import Router from 'next/router';
import { ArticleBar } from './Styles';

interface Props {
  articles: Article[];
}

const ArticleList: FC<Props> = ({ articles }) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isColChecked, setIsColChecked] = useState(false);

  useEffect(() => {
    if (isColChecked) {
      const ids = articles.map((article) => article._id);
      setCheckedList([...new Set(ids)]);
    } else {
      setCheckedList([]);
    }
  }, [articles, isColChecked]);

  const handleDeleteMany = () => {
    fetch(`/api/article/deleteMany`, {
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
        <button disabled={checkedList.length === 0} onClick={handleDeleteMany}>
          Delete
        </button>
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

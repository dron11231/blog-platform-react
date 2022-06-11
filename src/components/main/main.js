import React from 'react';
import { Pagination } from 'antd';

import ArticleList from '../article-list/article-list';
import Spinner from '../spinner/spinner';
import './main.scss';

export default function Main({ articles, articleList, setArticleList, loading, offset }) {
  const content = loading ? (
    <Spinner />
  ) : (
    <ArticleList articles={articles} articleList={articleList} setArticleList={setArticleList} />
  );
  let paginationValue;
  if (offset != '0') {
    paginationValue = Number(offset.slice(0, -1));
  } else {
    paginationValue = 1;
  }

  return (
    <main>
      {content}
      <Pagination
        current={paginationValue}
        onChange={(value) => {
          if (value === 1) {
            setArticleList((articleData) => {
              return { ...articleData, offset: 0 };
            });
          } else {
            setArticleList((articleData) => {
              return { ...articleData, offset: value + '0' };
            });
          }
        }}
        total={Math.floor(articles.articlesCount / 20) + '0'}
      />
    </main>
  );
}

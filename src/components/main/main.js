import React from 'react';
import { Pagination } from 'antd';

import ArticleList from '../article-list/article-list';
import Spinner from '../spinner/spinner';
import './main.scss';

export default function Main({ articles, articleList, setArticleList, loading }) {
  const content = loading ? (
    <Spinner />
  ) : (
    <ArticleList articles={articles} articleList={articleList} setArticleList={setArticleList} />
  );
  return (
    <main>
      {content}
      <Pagination
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

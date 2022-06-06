import React from 'react';
import { Pagination } from 'antd';

import './article-list.scss';
import Article from '../article/article';

export default function ArticleList({ articleList }) {
  const articleArr = articleList.map((article) => {
    return (
      <Article
        author={article.author}
        likes={article.favoritesCount}
        createdDate={article.createdAt}
        title={article.title}
        tags={article.tagList}
        description={article.description}
        slug={article.slug}
        key={article.slug}
      />
    );
  });
  return <div className="article-list">{articleArr}</div>;
}

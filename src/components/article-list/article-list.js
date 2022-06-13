import React from 'react';
import { Pagination } from 'antd';

import Article from '../article/article';
import './article-list.scss';

export default function ArticleList({ articleList, history }) {
  const articleArr = articleList.map((article) => {
    return (
      <Article
        history={history}
        author={article.author}
        likesCount={article.favoritesCount}
        favorited={article.favorited}
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

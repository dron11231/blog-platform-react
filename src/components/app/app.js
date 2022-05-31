import React from 'react';

import ArticleList from '../article-list/article-list';
import Header from '../header/header';
import './app.scss';

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <ArticleList />
    </React.Fragment>
  );
}

import React, { useEffect, useState } from 'react';

import ArticlesService from '../../api/articles-service';
import Spinner from '../spinner/spinner';
import avatar from '../article/avatar.svg';
import like from '../article/like.svg';
import './article-page.scss';

export default function ArticlePage({ slug }) {
  const [articleData, setArticleData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articlesService = new ArticlesService();
    articlesService.getArticlePage(slug).then((res) => {
      setArticleData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container--spinner">
        <Spinner />
      </div>
    );
  } else {
    let id = 1;
    const tagsList = articleData.tagList.map((tag) => {
      id++;
      return (
        <span key={id} className="article__tag">
          {tag}
        </span>
      );
    });
    return (
      <div className="container">
        <div className="article-page">
          <div className="article">
            <div className="article__header">
              <div className="article__header-item">
                <div className="article__details">
                  <h2 className="article__title">{articleData.title}</h2>
                  <div className="article__tags">{tagsList}</div>
                </div>
                <button className="article__like">
                  <img src={like} alt="like" />
                  <span className="article__likes-count">{articleData.favoritesCount}</span>
                </button>
              </div>
              <div className="article__header-item">
                <div className="article__details">
                  <span className="article__author-name">{articleData.author.username}</span>
                  <span className="article__date">March 5, 2020</span>
                </div>
                <img src={articleData.author.image} alt="avatar" className="article__avatar" />
              </div>
            </div>
            <div className="article__body">
              <p className="article__description">{articleData.description}</p>
            </div>
          </div>
          <div className="article-page__body">{articleData.body}</div>
        </div>
      </div>
    );
  }
}

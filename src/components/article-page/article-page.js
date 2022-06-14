import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { AuthContext } from '../app/app';
import ArticlesService from '../../api/articles-service';
import Spinner from '../spinner/spinner';
import like from '../article/like.svg';
import activeLike from '../article/active-like.svg';
import ArticleButtons from '../article-buttons/article-buttons';
import './article-page.scss';

export default function ArticlePage({ slug, history, setUpdate }) {
  const [articleData, setArticleData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const articlesService = new ArticlesService();
  const authorization = useContext(AuthContext);

  useEffect(() => {
    setUpdatePage(false);
    articlesService
      .getArticlePage(slug)
      .then((res) => {
        setArticleData(res);
        setLoading(false);
      })
      .catch((err) => {
        history.push('/404');
      });
  }, [updatePage]);

  if (loading) {
    return (
      <div className="container--spinner">
        <Spinner />
      </div>
    );
  } else {
    let id = 1;
    let tagsList;
    if (articleData.tagList !== null && articleData.tagList !== undefined) {
      tagsList = articleData.tagList.map((tag) => {
        id++;
        return (
          <span key={id} className="article__tag">
            {tag}
          </span>
        );
      });
    }
    return (
      <div className="container">
        <div className="article-page">
          <div className="article">
            <div className="article__header">
              <div className="article__header-item">
                <div className="article__details">
                  <div className="article__title-wrapper">
                    <h2 className="article__title">{articleData.title}</h2>
                    <div className="article__like-wrapper">
                      <button
                        className="article__like"
                        onClick={() => {
                          if (authorization.auth.auth) {
                            if (!articleData.favorited) {
                              articlesService.favoriteArticle(slug).then((res) => {
                                setUpdatePage(true);
                              });
                            } else {
                              articlesService.unfavoriteArticle(slug).then((res) => {
                                setUpdatePage(true);
                              });
                            }
                          } else {
                            history.push('/sign-in');
                          }
                        }}
                      >
                        <img src={articleData.favorited ? activeLike : like} alt="like" />
                        <span className="article__likes-count">{articleData.favoritesCount}</span>
                      </button>
                    </div>
                  </div>
                  <div className="article__tags">{tagsList}</div>
                </div>
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
              <ArticleButtons author={articleData.author} slug={slug} history={history} setUpdate={setUpdate} />
            </div>
          </div>
          <div className="article-page__body">
            <ReactMarkdown>{articleData.body}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
}

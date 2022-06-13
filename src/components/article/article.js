import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import format from 'date-fns/format';

import './article.scss';
import ArticlesService from '../../api/articles-service';
import { AuthContext } from '../app/app';

import like from './like.svg';
import activeLike from './active-like.svg';

export default function Article({
  slug,
  title,
  author,
  tags,
  likesCount,
  createdDate,
  description,
  favorited,
  history,
}) {
  let id = 1;
  let tagsList;
  const date = format(new Date(createdDate), 'MMMM d, yyyy');
  if (tags !== null && tags !== undefined) {
    tagsList = tags.map((tag) => {
      id++;
      return (
        <span key={id} className="article__tag">
          {tag}
        </span>
      );
    });
  }

  const authorization = useContext(AuthContext);

  const [likes, setFavorited] = useState({
    likesCount: likesCount,
    favorite: favorited,
  });

  const articlesService = new ArticlesService();

  return (
    <div className="article">
      <div className="article__header">
        <div className="article__header-item">
          <div className="article__details">
            <h2 className="article__title">
              <Link to={`/articles/${slug}`} className="article__link">
                {title}
              </Link>
            </h2>
            <div className="article__tags">{tagsList}</div>
          </div>
          <button
            className="article__like"
            onClick={() => {
              if (authorization.auth.auth) {
                if (!likes.favorite) {
                  articlesService.favoriteArticle(slug).then((res) => {
                    const article = res.article;
                    setFavorited({ favorite: article.favorited, likesCount: article.favoritesCount });
                  });
                } else {
                  articlesService.unfavoriteArticle(slug).then((res) => {
                    const article = res.article;
                    setFavorited({ favorite: article.favorited, likesCount: article.favoritesCount });
                  });
                }
              } else {
                history.push('/sign-in');
              }
            }}
          >
            <img src={likes.favorite ? activeLike : like} alt="like" />
            <span className="article__likes-count">{likes.likesCount}</span>
          </button>
        </div>
        <div className="article__header-item">
          <div className="article__details">
            <span className="article__author-name">{author.username}</span>
            <span className="article__date">{date}</span>
          </div>
          <img src={author.image} alt="avatar" className="article__avatar" />
        </div>
      </div>
      <div className="article__body">
        <p className="article__description">{description}</p>
      </div>
    </div>
  );
}

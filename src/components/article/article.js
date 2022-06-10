import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import './article.scss';
import like from './like.svg';

export default function Article({ slug, title, author, tags, likes, createdDate, description }) {
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
          <button className="article__like">
            <img src={like} alt="like" />
            <span className="article__likes-count">{likes}</span>
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

import React from 'react';

import './article.scss';
import like from './like.svg';
import avatar from './avatar.svg';

export default function Article() {
  return (
    <div className="article">
      <div className="article__header">
        <div className="article__header-item">
          <h2 className="article__title">Some article title</h2>
          <button className="article__like">
            <img src={like} alt="like" />
            <span className="article__likes-count">12</span>
          </button>
        </div>
        <div className="article__header-item">
          <div className="article__details">
            <span className="article__author-name">John Doe</span>
            <span className="article__date">March 5, 2020</span>
          </div>
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
}

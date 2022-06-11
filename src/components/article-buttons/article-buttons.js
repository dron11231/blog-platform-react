import React, { useContext } from 'react';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

import ArticlesService from '../../api/articles-service';
import { AuthContext } from '../app/app';

import './article-buttons.scss';

export default function ArticleButtons({ author, slug, history, setUpdate }) {
  const { auth } = useContext(AuthContext);
  const modalText = 'Are you sure to delete this article?';
  const articlesService = new ArticlesService();

  const onConfirm = () => {
    articlesService.deleteArticle(slug).then(() => {
      history.push('/');
      setUpdate(true);
    });
  };

  if (auth.user.username === author.username) {
    return (
      <div className="article-btns">
        <Popconfirm placement="right" title={modalText} okText="Yes" cancelText="No" onConfirm={onConfirm}>
          <button type="button" className="article-btns__btn article-btns__btn--delete">
            Delete
          </button>
        </Popconfirm>
        <Link to={`/articles/${slug}/edit`} type="button" className="article-btns__btn article-btns__btn--edit">
          Edit
        </Link>
      </div>
    );
  } else {
    return null;
  }
}

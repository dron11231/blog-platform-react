import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import Spinner from '../spinner/spinner';
import ArticlesService from '../../api/articles-service';
import { AuthContext } from '../app/app';
import Tag from '../tag/tag';
import './create-article.scss';

export default function CreateArticle({ history, setUpdate, edit, slug }) {
  const [tags, setTags] = useState([{ id: 1, text: '' }]);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const articlesService = new ArticlesService();
  const { auth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  if (edit) {
    useEffect(() => {
      if (tags.length === 1) {
        articlesService.getArticle(slug).then((res) => {
          const username = JSON.parse(localStorage.getItem('user')).username;
          if (res.article.author.username === username) {
            setTags(() => {
              const newArr = [];
              let id = 0;
              res.article.tagList.forEach((tag) => {
                id++;
                newArr.push({ id: id, text: tag });
              });
              if (newArr.length === 0) {
                newArr.push({ id: 1, text: '' });
              }
              return newArr;
            });
            setArticle({ ...res.article });
            setLoading(false);
          } else {
            history.push('/403');
          }
        });
      }
    }, []);
  } else {
    useEffect(() => {
      setLoading(false);
    }, []);
  }

  let id = 0;
  const elems = tags.map((tag) => {
    id++;
    return <Tag setTags={setTags} key={id} id={tag.id} value={tag.text} tagList={tags} />;
  });

  const onSubmit = (data) => {
    const tagsText = [];
    tags.forEach((tag) => {
      if (tag.text !== '') {
        tagsText.push(tag.text);
      }
    });
    const fullData = { ...data };
    tagsText.length !== 0 ? (fullData.tagList = tagsText) : (fullData.tagList = []);
    if (edit) {
      articlesService.updateArticle(fullData, slug).then((res) => {
        setUpdate(true);
        history.push('/');
      });
    } else {
      articlesService.postArticle(fullData).then(() => {
        setUpdate(true);
        history.push('/');
      });
    }
  };

  const title = edit ? 'Edit article' : 'Create new article';

  if (loading) {
    return (
      <div className="container spinner">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="create-article">
          <div className="inner-wrapper">
            <h2 className="create-article__title">{title}</h2>
            <form className="create-article__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="create-article__input-wrapper">
                <span className="create-article__input-name">Title</span>
                <input
                  {...register('title', { required: true })}
                  name="title"
                  type="text"
                  className={(errors.title ? 'create-article__input--error ' : '') + 'create-article__input'}
                  placeholder="Title"
                  defaultValue={article.title}
                />
                {errors.title?.type === 'required' && (
                  <span className="create-article__error-text">Title is required</span>
                )}
              </div>
              <div className="create-article__input-wrapper">
                <span className="create-article__input-name">Short description</span>
                <input
                  {...register('description', { required: true })}
                  name="description"
                  type="text"
                  className={(errors.description ? 'create-article__input--error ' : '') + 'create-article__input'}
                  placeholder="Description"
                  defaultValue={article.description}
                />
                {errors.description?.type === 'required' && (
                  <span className="create-article__error-text">Description is required</span>
                )}
              </div>
              <div className="create-article__input-wrapper">
                <span className="create-article__input-name">Text</span>
                <textarea
                  {...register('text', { required: true })}
                  name="text"
                  type="text"
                  className={(errors.text ? 'create-article__input--error ' : '') + 'create-article__input'}
                  placeholder="Text"
                  rows={10}
                  defaultValue={article.body}
                />
                {errors.text?.type === 'required' && (
                  <span className="create-article__error-text">Text is required</span>
                )}
              </div>
              <div className="create-article__input-wrapper">
                <span className="create-aricle__input-name">Tags</span>
                <div className="create-article__tags-wrapper">{elems}</div>
                <button type="submit" className="create-article__btn">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

/* useEffect(() => {
    const tag = document.querySelector('.create-article__tags-wrapper');
    const deleteBtn = document.querySelector('.create-article__delete-btn');
    tag.addEventListener('click', (e) => {
      if (e.target.className === 'create-article__delete-btn' && e.target.parentNode.id !== '0') {
        setTags((tagList) => {
          let newArr = [...tagList];
          const idx = tagList.findIndex((el) => el.id === +e.target.parentNode.id);
          newArr.splice(idx, 1);
          return [...newArr];
        });
      }
    });
  }, []); */

/* useEffect(() => {
    const btn = document.querySelector('.create-article__add-btn');
    if (btn) {
      btn.addEventListener('click', function added(e) {
        btn.removeEventListener('click', added);
        id++;
        e.target.remove();
        setTags((tagList) => {
          let newArr = [...tagList];
          newArr.push({ id: id });
          console.log(newArr);
          return [...newArr];
        });
      });
    }
  }, [tags]); */

/* const Tag = () => {
    return (
      <div className="create-article__tag-wrapper">
        <input type="text" className="create-article__input" placeholder="Tag" />
        <button
          onClick={(e) => {
            setTags((tagList) => {
              let newArr = [...tagList];
              newArr.splice(0, 1);
              return [...newArr];
            });
          }}
          type="button"
          className="create-article__delete-btn"
        >
          delete
        </button>
        <button
          onClick={() => {
            id++;
            setTags((tagList) => {
              let newArr = [...tagList];
              newArr.push({ id: id });
              console.log(newArr);
              return [...newArr];
            });
          }}
          type="button"
          className="create-article__add-btn"
        >
          Add tag
        </button>
      </div>
    );
  }; */

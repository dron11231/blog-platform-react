import React, { useEffect, useMemo, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Profile from '../profile/profile';
import SignUp from '../sign-up/sign-up';
import SignIn from '../sign-in/sign-in';
import Main from '../main/main';
import Header from '../header/header';
import ArticlePage from '../article-page/article-page';
import CreateArticle from '../create-article/create-article';
import ArticlesService from '../../api/articles-service';
import ErrorPage from '../error-page/error-page';

import './app.scss';
import 'antd/dist/antd.css';

export const AuthContext = React.createContext();

export default function App() {
  const initialStatus = useMemo(() => {
    return {
      loading: true,
      error: false,
    };
  }, []);

  const initialAuthorization = useMemo(() => {
    return {
      user: {},
      auth: false,
    };
  }, []);

  const [articles, setArticleList] = useState({ articleList: [], offset: 0, articlesCount: 0 });
  const [update, setUpdate] = useState(false);
  const [statusData, setStatus] = useState(initialStatus);
  const [authorization, setAuthorization] = useState(initialAuthorization);
  const [token, setToken] = useState(localStorage.getItem('userToken'));

  const articlesService = new ArticlesService();

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      fetch('https://kata.academy:8021/api/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          setAuthorization(() => {
            if (res.user.image) {
              return { user: { ...res.user, avatar: res.user.image }, auth: true };
            } else {
              return {
                user: { ...res.user, avatar: 'https://static.productionready.io/images/smiley-cyrus.jpg' },
                auth: true,
              };
            }
          });
        })
        .catch((err) => {
          setStatus({ loading: false, error: true });
        });
    }
  }, [token]);

  useEffect(() => {
    setStatus(initialStatus);
    setUpdate(false);
    articlesService
      .getArticles(articles.offset)
      .then((res) => {
        setArticleList((articlesState) => {
          return { ...articlesState, articlesCount: res.articlesCount };
        });
        return res.articles;
      })
      .then((articles) => {
        setStatus((status) => {
          return { ...status, loading: false };
        });
        setArticleList((articlesState) => {
          return { ...articlesState, articleList: articles };
        });
      })
      .catch((err) => {
        setStatus({ loading: false, error: true });
      });
  }, [articles.offset, update, authorization]);

  const { loading, error } = statusData;

  return (
    <>
      <AuthContext.Provider value={{ auth: authorization, setAuthorization: setAuthorization }}>
        <Header setToken={setToken} setArticleList={setArticleList} setUpdate={setUpdate} />
        <Switch>
          <Route
            path="/"
            exact
            render={({ history }) => {
              return (
                <Main
                  history={history}
                  loading={loading}
                  articles={articles}
                  articleList={articles.articleList}
                  setArticleList={setArticleList}
                  offset={articles.offset}
                />
              );
            }}
          />
          <Route
            path="/articles"
            exact
            render={({ history }) => {
              return (
                <Main
                  history={history}
                  loading={loading}
                  articles={articles}
                  articleList={articles.articleList}
                  setArticleList={setArticleList}
                  offset={articles.offset}
                />
              );
            }}
          />
          <Route
            path="/articles/:slug"
            exact
            render={({ match, history }) => {
              return <ArticlePage slug={match.params.slug} history={history} setUpdate={setUpdate} />;
            }}
          />
          <Route
            path="/sign-up"
            exact
            render={({ history }) => {
              return <SignUp history={history} />;
            }}
          />
          <Route
            path="/sign-in"
            render={({ history }) => {
              return <SignIn history={history} setToken={setToken} />;
            }}
          />
          <Route
            path="/profile"
            exact
            render={({ history }) => {
              if (localStorage.getItem('userToken')) {
                return <Profile setToken={setToken} history={history} />;
              } else {
                return <Redirect to="/sign-in" />;
              }
            }}
          />
          <Route
            path="/new-article"
            exact
            render={({ history }) => {
              if (localStorage.getItem('userToken')) {
                return <CreateArticle history={history} setUpdate={setUpdate} />;
              } else {
                return <Redirect to="/sign-in" />;
              }
            }}
          />
          <Route
            path="/articles/:slug/edit"
            exact
            render={({ history, match }) => {
              if (localStorage.getItem('userToken')) {
                return <CreateArticle history={history} edit={true} slug={match.params.slug} setUpdate={setUpdate} />;
              } else {
                return <Redirect to="/sign-in" />;
              }
            }}
          />
          <Route
            path="/403"
            render={() => {
              return <ErrorPage status="403" />;
            }}
          />
          <Route
            render={() => {
              return <ErrorPage status="404" />;
            }}
          />
        </Switch>
      </AuthContext.Provider>
    </>
  );
}

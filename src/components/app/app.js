import React, { useEffect, useMemo, useState } from 'react';
import { Route } from 'react-router-dom';

import SignUp from '../sign-up/sign-up';
import SignIn from '../sign-in/sign-in';
import Main from '../main/main';
import Header from '../header/header';
import ArticlePage from '../article-page/article-page';
import ArticlesService from '../../api/articles-service';

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

  const [articles, setArticleList] = useState({ articleList: [], offset: 0, articlesCount: 0 });
  const [statusData, setStatus] = useState(initialStatus);
  const [authorization, setAuthorization] = useState({
    user: {},
    auth: false,
  });

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
          setAuthorization(() => {
            if (res.user.avatar) {
              return { user: res.user, auth: true };
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
  }, []);

  useEffect(() => {
    setStatus(initialStatus);

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
  }, [articles.offset]);

  const { loading, error } = statusData;

  const main = (
    <Main loading={loading} articles={articles} articleList={articles.articleList} setArticleList={setArticleList} />
  );

  return (
    <>
      <AuthContext.Provider value={{ auth: authorization, setAuthorization: setAuthorization }}>
        <Header />
        <Route path="/" exact render={() => main} />
        <Route path="/articles" exact render={() => main} />
        <Route
          path="/articles/:slug"
          exact
          render={({ match }) => {
            return <ArticlePage slug={match.params.slug} />;
          }}
        />
        <Route
          path="/sign-up"
          render={({ history }) => {
            return <SignUp history={history} />;
          }}
        />
        <Route
          path="/sign-in"
          render={({ history }) => {
            return <SignIn history={history} />;
          }}
        />
      </AuthContext.Provider>
    </>
  );
}

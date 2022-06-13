class ArticlesService {
  getArticles = async (offset) => {
    const res = await (
      await fetch(`https://kata.academy:8021/api/articles?offset=${offset}&limit=10`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        },
      })
    ).json();
    return res;
  };

  getArticlePage = async (slug) => {
    const res = await (
      await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        },
      })
    ).json();
    return res.article;
  };

  registerNewUser = async (data) => {
    let signUpData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };

    signUpData = JSON.stringify(signUpData);
    const res = await fetch('https://kata.academy:8021/api/users', {
      method: 'POST',
      body: signUpData,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resJson = await res.json();
    return resJson;
  };

  authUser = async (data) => {
    let signInData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    signInData = JSON.stringify(signInData);

    const res = await fetch('https://kata.academy:8021/api/users/login', {
      method: 'POST',
      body: signInData,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resJson = await res.json();
    return resJson;
  };

  updateUser = async (data) => {
    let newUserData = {
      user: {
        email: data.email,
        username: data.username,
        image: data.avatar,
      },
    };

    newUserData = JSON.stringify(newUserData);

    const res = await fetch('https://kata.academy:8021/api/user', {
      method: 'PUT',
      body: newUserData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    });

    const resJson = await res.json();
    return resJson;
  };

  postArticle = async (data) => {
    let articleData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: data.tagList,
      },
    };
    articleData = JSON.stringify(articleData);
    const res = await fetch('https://kata.academy:8021/api/articles', {
      method: 'POST',
      body: articleData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    });

    const resJson = await res.json();
    return resJson;
  };

  deleteArticle = (slug) => {
    return fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    });
  };

  updateArticle = async (data, slug) => {
    let newArticleData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: data.tagList,
      },
    };

    newArticleData = JSON.stringify(newArticleData);

    const res = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'PUT',
      body: newArticleData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    });

    const resJson = await res.json();
    return resJson;
  };

  favoriteArticle = async (slug) => {
    const res = await fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    });
    const resJson = await res.json();
    return resJson;
  };

  unfavoriteArticle = async (slug) => {
    const res = await fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    });
    const resJson = await res.json();
    return resJson;
  };
}

export default ArticlesService;

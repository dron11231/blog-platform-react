class ArticlesService {
  getArticles = async (offset) => {
    const res = await (await fetch(`https://kata.academy:8021/api/articles?offset=${offset}`)).json();
    return res;
  };

  getArticlePage = async (slug) => {
    const res = await (await fetch(`https://kata.academy:8021/api/articles/${slug}`)).json();
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
}

export default ArticlesService;

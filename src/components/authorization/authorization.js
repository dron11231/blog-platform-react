import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../app/app';
import './authorization.scss';

export default function Authorization({ setToken }) {
  const { auth, setAuthorization } = useContext(AuthContext);
  const content = auth.auth ? (
    <Authorized auth={auth} setToken={setToken} setAuthorization={setAuthorization} />
  ) : (
    <NotAuthorized />
  );
  return content;
}

const Authorized = ({ auth, setAuthorization, setToken }) => {
  const { user } = auth;
  return (
    <div className="authorization">
      <Link to="/new-article" className="authorization__btn--create">
        Create Article
      </Link>
      <Link to="/profile" className="authorization__user ">
        <span className="authorization__username">{user.username}</span>
        <img src={user.avatar} className="authorization__avatar"></img>
      </Link>
      <button
        className="authorization__btn--log-out"
        onClick={() => {
          localStorage.removeItem('userToken');
          localStorage.removeItem('user');
          setToken(null);
          setAuthorization({ user: {}, auth: false });
        }}
      >
        Log Out
      </button>
    </div>
  );
};

const NotAuthorized = () => {
  return (
    <div className="authorization">
      <Link to="/sign-in" className="authorization__btn--not-auth authorization__btn--sign-in">
        Sign In
      </Link>
      <Link to="/sign-up" className="authorization__btn--not-auth authorization__btn--sign-up">
        Sign Up
      </Link>
    </div>
  );
};

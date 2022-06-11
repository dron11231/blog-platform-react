import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { AuthContext } from '../app/app';
import ArticlesService from '../../api/articles-service';
import './sign-in.scss';

export default function SignIn({ history, setToken }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const articlesService = new ArticlesService();

  const [serviceStatus, setServiceStatus] = useState({});

  const { auth, setAuthorization } = useContext(AuthContext);

  const onSubmit = (data) => {
    articlesService.authUser(data).then((res) => {
      if (res.errors) {
        setServiceStatus(res.errors);
      } else {
        localStorage.setItem('userToken', res.user.token);
        setServiceStatus({});
        history.push('/');
        setAuthorization({
          user: { ...res.user, avatar: 'https://static.productionready.io/images/smiley-cyrus.jpg' },
          auth: true,
        });
        setToken(localStorage.setItem('userToken', res.user.token));
      }
    });
  };

  const emailReg =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="inner-wrapper">
        <h2 className="form__title">Sign In</h2>
        <div className="form__input-wrapper">
          <span className="form__input-name">Email address</span>
          <input
            {...register('email', { required: true, pattern: emailReg })}
            name="email"
            className={
              (errors.email || serviceStatus['email or password'] ? 'form__input--error ' : '') + 'form__input'
            }
            type="text"
            placeholder="Email address"
          />
          {serviceStatus['email or password'] && <span className="form__error-text">Email or password is invalid</span>}
          {errors.email?.type === 'pattern' && <span className="form__error-text">Incorrect email</span>}
          {errors.email?.type === 'required' && <span className="form__error-text">Email is required</span>}
        </div>
        <div className="form__input-wrapper">
          <span className="form__input-name">Password</span>
          <input
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
            autoComplete="off"
            name="password"
            className={
              (errors.password || serviceStatus['email or password'] ? 'form__input--error ' : '') + 'form__input'
            }
            type="password"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && <span className="form__error-text">Password is required</span>}
          {errors.password?.type === 'minLength' && (
            <span className="form__error-text">Your password needs to be at least 6 characters.</span>
          )}
          {errors.password?.type === 'maxLength' && (
            <span className="form__error-text">Your password must be no more than 40 characters</span>
          )}
          {serviceStatus['email or password'] && <span className="form__error-text">Email or password is invalid</span>}
        </div>
        <button type="submit" className="form__btn">
          Login
        </button>
        <span className="form__bottom-text">
          Don’t have an account?{' '}
          <Link to="/sign-up" className="form__link">
            Sign Up.
          </Link>
        </span>
      </div>
    </form>
  );
}

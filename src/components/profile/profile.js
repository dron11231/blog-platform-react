/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import ArticlesService from '../../api/articles-service';
import './profile.scss';

export default function Profile({ setToken, history }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const articlesService = new ArticlesService();
  const [serviceErrs, setServiceErrs] = useState({});
  const onSubmit = (data) => {
    if (localStorage.getItem('userToken')) {
      articlesService.updateUser(data).then((res) => {
        if (res.errors) {
          setServiceErrs(res.errors);
        } else {
          setServiceErrs({});
          localStorage.setItem('userToken', res.user.token);
          setToken(localStorage.getItem('userToken'));
          history.push('/');
        }
      });
    } else {
      alert('You are not logged in!');
    }
  };

  const emailReg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const urlReg = /(^https?:\/\/)/i;

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="inner-wrapper">
        <h2 className="form__title">Edit Profile</h2>
        <div className="form__input-wrapper">
          <span className="form__input-name">Username</span>
          <input
            {...register('username', { required: true, minLength: 3, maxLength: 20 })}
            name="username"
            className={(errors.username || serviceErrs.username ? 'form__input--error ' : '') + 'form__input'}
            type={'text'}
            placeholder="Username"
          />
          {errors.username?.type === 'required' && <span className="form__error-text">Username is required</span>}
          {errors.username?.type === 'minLength' && (
            <span className="form__error-text">Your username needs to be at least 3 characters</span>
          )}
          {errors.username?.type === 'maxLength' && (
            <span className="form__error-text">Your username must be no more than 20 characters</span>
          )}
          {serviceErrs.username === 'is invalid' && (
            <span className="form__error-text">This username is not correct</span>
          )}
          {serviceErrs.username === 'is already taken.' && (
            <span className="form__error-text">This username is is already taken</span>
          )}
        </div>
        <div className="form__input-wrapper">
          <span className="form__input-name">Email address</span>
          <input
            {...register('email', { required: true, pattern: emailReg })}
            name="email"
            className={(errors.email || serviceErrs.email ? 'form__input--error ' : '') + 'form__input'}
            type="text"
            placeholder="Email address"
          />
          {errors.email?.type === 'pattern' && <span className="form__error-text">Incorrect email</span>}
          {errors.email?.type === 'required' && <span className="form__error-text">Email is required</span>}
          {serviceErrs.email && <span className="form__error-text">This email is already taken</span>}
        </div>
        <div className="form__input-wrapper">
          <span className="form__input-name">New password</span>
          <input
            {...register('password', {
              required: false,
              minLength: 6,
              maxLength: 40,
            })}
            autoComplete="off"
            name="password"
            className={(errors.password ? 'form__input--error ' : '') + 'form__input'}
            type="password"
            placeholder="New password"
          />
          {errors.password?.type === 'required' && <span className="form__error-text">Password is required</span>}
          {errors.password?.type === 'minLength' && (
            <span className="form__error-text">Your password needs to be at least 6 characters.</span>
          )}
          {errors.password?.type === 'maxLength' && (
            <span className="form__error-text">Your password must be no more than 40 characters</span>
          )}
        </div>
        <div className="form__input-wrapper">
          <span className="form__input-name">Avatar image (url)</span>
          <input
            type="text"
            name="avatar"
            className={(errors.avatar ? 'form__input--error ' : '') + 'form__input'}
            placeholder="Avatar image"
            {...register('avatar', { required: false, pattern: urlReg })}
          />
          {errors.avatar?.type === 'pattern' && <span className="form__error-text">Incorrect url</span>}
        </div>
        <button type="submit" className="form__btn">
          Save
        </button>
      </div>
    </form>
  );
}

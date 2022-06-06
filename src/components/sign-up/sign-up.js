import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import ArticlesService from '../../api/articles-service';
import './sign-up.scss';

export default function SignUp({ history }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const [serviceErrs, setServiceErrs] = useState({});
  const articlesService = new ArticlesService();
  const onSubmit = (data) => {
    articlesService.registerNewUser(data).then((res) => {
      if (res.errors) {
        setServiceErrs(res.errors);
      } else {
        setServiceErrs({});
        history.push('/sign-in');
      }
    });
  };

  const emailReg =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="inner-wrapper">
        <h2 className="form__title">Create new account</h2>
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
            name="email"
            className={(errors.email || serviceErrs.email ? 'form__input--error ' : '') + 'form__input'}
            type={'text'}
            {...register('email', { required: true, pattern: emailReg })}
            placeholder="Email address"
          />
          {errors.email?.type === 'pattern' && <span className="form__error-text">Incorrect email</span>}
          {errors.email?.type === 'required' && <span className="form__error-text">Email is required</span>}
          {serviceErrs.email && <span className="form__error-text">This email is already taken</span>}
        </div>
        <div className="form__input-wrapper">
          <span className="form__input-name">Password</span>
          <input
            name="password"
            autoComplete="off"
            className={(errors.password ? 'form__input--error ' : '') + 'form__input pwd-1'}
            type={'password'}
            placeholder="Password"
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
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
          <span className="form__input-name">Repeat password</span>
          <input
            name="password-repeat"
            autoComplete="off"
            className={(errors['password-repeat'] ? 'form__input--error ' : '') + 'form__input pwd-2'}
            type={'password'}
            placeholder="Password"
            {...register('password-repeat', {
              required: true,
              validate: (input) => {
                const pwd1 = document.querySelector('.pwd-1');
                const pwd2 = document.querySelector('.pwd-2');
                if (pwd1.value !== pwd2.value) return false;
                else return true;
              },
            })}
          />
          {errors['password-repeat']?.type === 'validate' && (
            <span className="form__error-text">Passwords must match</span>
          )}
          {errors['password-repeat']?.type === 'required' && (
            <span className="form__error-text">Password repeat is required</span>
          )}
        </div>
        <div className="form__checkbox-wrapper">
          <input required type={'checkbox'} className="form__checkbox" />
          <span className="form__checkbox-text">
            I agree to the processing of my personal
            <br /> information
          </span>
        </div>
        <button type="submit" className="form__btn">
          Create
        </button>
        <span className="form__bottom-text">
          Already have an account?{' '}
          <Link to="/sign-in" className="form__link">
            Sign In.
          </Link>
        </span>
      </div>
    </form>
  );
}

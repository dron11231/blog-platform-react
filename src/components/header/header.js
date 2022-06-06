import React from 'react';
import { Link } from 'react-router-dom';

import Authorization from '../authorization/authorization';
import './header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="inner-wrapper">
        <h1 className="header__title">
          <Link exact="true" to="/">
            Realworld Blog
          </Link>
        </h1>
        <Authorization />
      </div>
    </header>
  );
}

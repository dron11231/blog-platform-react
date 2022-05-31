import React from 'react';

import Authorization from '../authorization/authorization';
import './header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="inner-wrapper">
        <h1 className="header__title">Realworld Blog</h1>
        <Authorization />
      </div>
    </header>
  );
}

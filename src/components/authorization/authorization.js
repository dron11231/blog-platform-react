import React from 'react';
import './authorization.scss';

export default function Authorization() {
  return (
    <div className="authorization">
      <button className="authorization__btn authorization__btn--sign-in">Sign In</button>
      <button className="authorization__btn authorization__btn--sign-up">Sign Up</button>
    </div>
  );
}

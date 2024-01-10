// Banner.js
import React, { useState } from 'react';
import LoginForm from './LogInForm';
import SignupForm from './SignUpForm';
import './BannerTop.css';

const Banner = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowSignupForm(false);
  };

  const toggleSignupForm = () => {
    setShowSignupForm(!showSignupForm);
    setShowLoginForm(false);
  };

  return (
    <div className="banner">
      <button onClick={toggleLoginForm} className="login-button">Login</button>
      <button onClick={toggleSignupForm} className="signup-button">Sign Up</button>

      {/* Affichez le formulaire de connexion si showLoginForm est vrai */}
      {showLoginForm && <LoginForm />}

      {/* Affichez le formulaire d'inscription si showSignupForm est vrai */}
      {showSignupForm && <SignupForm />}
    </div>
  );
};

export default Banner;

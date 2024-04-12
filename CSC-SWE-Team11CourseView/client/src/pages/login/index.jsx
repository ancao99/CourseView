import React, { useState } from 'react';
import './login.css';

export const Login = () => {

 // Define state variables to manage the slider and form section movements
 const [isSignUp, setIsSignUp] = useState(false);

 // Function to handle signup button click
 const handleSignUpClick = () => {
   setIsSignUp(true);
 };

 // Function to handle login button click
 const handleLoginClick = () => {
   setIsSignUp(false);
 };
  return (
    <div className='app'>
      <div className={`cont ${isSignUp ? 's-signup' : ''}`}>
        <div className="form sign-in">
          <h2>Sign In</h2>
          <label>
            <span>Email Address</span>
            <input type="email" name="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" />
          </label>
          <button className="submit" type="button">
            Sign In
          </button>
          <p className="forgot-pass">Forgot Password ?</p>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img-text m-up">
              <h2>New here?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
            </div>
            <div className="img-text m-in">
              <h2>One of us?</h2>
              <p>If you already have an account, just sign in. We've missed you!</p>
            </div>
            <div className="img-btn" onClick={isSignUp ? handleLoginClick : handleSignUpClick}>
              <span className={isSignUp ? 'm-in' : 'm-up'}>{isSignUp ? 'Sign In' : 'Sign Up'}</span>
            </div>
          </div>
          <div className="form sign-up">
            <h2>Sign Up</h2>
            <label>
              <span>Name</span>
              <input type="text" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" />
            </label>
            <label>
              <span>Confirm Password</span>
              <input type="password" />
            </label>
            <button type="button" className="submit">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
  </div>
  );
};

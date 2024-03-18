import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import './login.css';
import Cookies from "js-cookie";
import ClientAPI from "../../api/clientAPI";

export const Login = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Cookies.get("userID") !== undefined)
      navigate("/");
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!user.email || !user.password || !user.fullName) {
        return alert("Please enter your information!")
      }
      await ClientAPI.post("register", user);
      alert("Register success. Redirect to login...")      
      const timeout = setTimeout(() => {
        setIsSignUp(false);
        clearTimeout(timeout);
      }, 500);
    } catch (error) {
      alert("Register Fail") 
    }
  };

  const handleInputChange = (event, key) => {
    setUser(prev => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });  

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {    
      const respond = await ClientAPI.post("login",loginUser);
      if(respond.data.userID !== undefined){
        Cookies.set("userID", respond.data.userID);
        Cookies.set("isAdmin", respond.data.isAdmin); 
        alert("Login success. Redirect to home page...")
        const timeout = setTimeout(() => {
          navigate("/");
          clearTimeout(timeout);
        }, 500);
      } else {
        alert("Login fail.")
      }
    } catch (error) {   
      alert(error);
    }
  };

  const handleInputLoginChange = (event, key) => {
    setLoginUser(prev => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className='app'>
      <div className={`cont ${isSignUp ? 's-signup' : ''}`}>
        <div className="form sign-in">
          <h2>Sign In</h2>
          <form method="POST" id="login-form" onSubmit={handleLoginSubmit}>
            <label>
              <span>Email Address</span>
              <input 
                value={loginUser.email}
                onChange={(e) => handleInputLoginChange(e, "email")}
                type="email" name="email" required />
            </label>
            <label>
              <span>Password</span>
              <input 
                value={loginUser.password}
                onChange={(e) => handleInputLoginChange(e, "password")}
                id="customer_password"
                type="password" name="password" required/>
            </label>
            <button className="submit" type="submit">Sign In</button>
          </form>
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
            <form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <label>
                <span>Name</span>
                <input                   
                  value={user.fullName}
                  onChange={(e) => handleInputChange(e, "fullName")} 
                  id="customer_name" 
                  type="text" required/>
              </label>
              <label>
                <span>Email</span>
                <input
                  value={user.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  id="customer_email"
                  type="email" required/>
              </label>
              <label>
                <span>Password</span>
                <input 
                  value={user.password}
                  onChange={(e) => handleInputChange(e, "password")}
                  id="customer_password"
                  type="password" required/>
              </label>
              <button type="submit" className="submit">Sign Up Now</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

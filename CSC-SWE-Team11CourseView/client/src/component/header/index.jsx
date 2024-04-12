import React from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  const handleHomeButtonClick = () => {
    navigate('/');
  };

  const handleAboutButtonClick = () => {
    navigate('/about-us');
  };


  return (
    <header className="header-container">
      <div className="left-section">
        <div className="nav-link">
          <button onClick={handleHomeButtonClick}><img src="home.png" style={{ width: '50px', height: '50px' }} alt="Home"></img><div className='image-info'>Home</div></button>
        </div>
        <div className="nav-link">
          <button onClick={handleAboutButtonClick}><img src="about.png" style={{ width: '50px', height: '50px' }} alt="About"></img><div className='image-info'>About</div></button>
        </div>
      </div>
      <div className="logo-container">
        <div className="brand-name">CourseView</div>
      </div>
      <div className="right-section">
        <div className="nav-link">
          <button onClick={handleLoginButtonClick}><img src="login_icon.png" style={{ width: '50px', height: '50px' }} alt="Login"></img><div className='image-info'>Login</div></button>
        </div>
      </div>
    </header>
  );
}

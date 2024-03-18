import React, { useState, useRef, useEffect } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ClientAPI from '../../api/clientAPI';

export function Header() {
  const navigate = useNavigate();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const feedbackFormRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showFeedbackForm &&
        feedbackFormRef.current &&
        !feedbackFormRef.current.contains(event.target) &&
        event.target.closest('.feedback') !== feedbackFormRef.current
      ) {
        setShowFeedbackForm(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFeedbackForm]);

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  const handleHomeButtonClick = () => {
    navigate('/');
  };

  const handleAboutButtonClick = () => {
    navigate('/about-us');
  };

  const handleCourseButtonClick = () => {
    navigate('/courses');
  };

  const handleFeedBackButtonClick = () => {
    setShowFeedbackForm(true);
  };

  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  const handleLogOut = async () => {
    try {
      const data = { nothing: "nothing" };
      const respond = await ClientAPI.post("logout", data);
      //console.log("From HeaderLogOut.jsx: ", respond.data);
      if (respond.data === "Log out") {
        Cookies.remove("userID");
        Cookies.remove("isAdmin");
        Cookies.remove("access_token");
      }
      alert("Log Out success.")
      navigate("/");
    }
    catch (err) {
      //console.log("From HeaderLogOut.jsx: ", err);
      alert("Log Out got Error.")
    }
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <div className="brand-name">CourseView</div>
      </div>
      <div className="right-section">
        <div className="nav-link">
          <button onClick={handleHomeButtonClick}><img src="home.png" style={{ width: '50px', height: '50px' }} alt="Home"></img><div className='image-info'>Home</div></button>
        </div>

        <div className='nav-link'>
          <button onClick={handleCourseButtonClick}><img src="search.png" style={{ width: '50px', height: '50px' }} alt="place holder course"></img><div className='image-info'>Courses</div></button>
        </div>

        <div className="nav-link">
          <button onClick={handleAboutButtonClick}><img src="about.png" style={{ width: '50px', height: '50px' }} alt="About"></img><div className='image-info'>About</div></button>
        </div>
        <div className="nav-link">
          <button onClick={handleFeedBackButtonClick}><img src="feedback.png" style={{ width: '50px', height: '50px' }} alt="Feedback"></img><div className='image-info'>FeedBack</div></button>
        </div>
        <div className="nav-link">
          <button onClick={handleLoginButtonClick}><img src="login_icon.png" style={{ width: '50px', height: '50px' }} alt="Login"></img><div className='image-info'>Account</div></button>
        </div>
        {Cookies.get("userID") && (
          <div className="nav-link">
            <button onClick={handleLogOut}><img src="logout.png" style={{ width: '50px', height: '50px' }} alt="Logout"></img><div className='image-info'>Logout</div></button>
          </div>
        )}

      </div>
      {showFeedbackForm && (
        <div className='feedback' ref={feedbackFormRef}>
          <form id="form">
            <button className='close_button' onClick={handleCloseFeedbackForm}><img src="close_feedback.png" style={{ width: '30px', height: '30px' }} alt="close"></img></button>
            <h1>CourseView Survey Form</h1>
            {/* Details */}
            <div className="form-control">
              <label className="name" id="label-name">
                <strong>Name</strong>
              </label>
              <div>
                {/* Input Type Text */}
                <input type="text" id="name" placeholder="Enter your name" required />
                <span />
              </div>
            </div>
            <div className="form-control">
              <label className="email" id="label-email">
                <strong>Email</strong>
              </label>
              {/* Input Type Email*/}
              <div>
                <input type="email" id="email" placeholder="Enter your email" required />
                <span />
              </div>
            </div>
            <div className="form-control">
              <label className="role" id="label-role">
                <strong>Which option best describes you?</strong>
              </label>
              {/* Dropdown options */}
              <select name="role" id="role">
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="other">Anonymous</option>
              </select>
            </div>
            <div id='radio-button-form' className="form-control">
              <label><strong>Would you recommend CourseView to a friend?</strong></label>
              {/* Input Type Radio Button */}
              <label className="recommed-1">
                <input type="radio" id="recommed-1" name="recommed" />
                &nbsp; Yes
              </label>
              <label className="recommed-2">
                <input type="radio" id="recommed-2" name="recommed" />
                &nbsp; No
              </label>
              <label className="recommed-3">
                <input type="radio" id="recommed-3" name="recommed" />
                &nbsp; Maybe
              </label>
            </div>
            <div className="form-control">
              <label className="comment"><strong>Any comments or suggestions</strong></label>
              {/* multi-line text input control */}
              <textarea
                name="comment"
                id="comment"
                placeholder="Enter your comment here"
              />
            </div>
            {/* Multi-line Text Input Control */}
            <button type="submit" value="submit">
              <strong>Submit</strong>
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

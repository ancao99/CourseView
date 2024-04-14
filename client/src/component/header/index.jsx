import React, { useState, useRef, useEffect } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ClientAPI from '../../api/clientAPI';

export function Header() {
  const [feedback, setFeedback] = useState({
    userID: Cookies.get("userID") || "",
    name: "",
    role: "student",
    type: "",
    comment: "",
    recommed: ""
    });
  const handleInputChange = (event, key) => {
    setFeedback(prev => ({
      ...prev,
      [key]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(feedback)
      if (!feedback.userID || !feedback.name || !feedback.role || !feedback.type || !feedback.comment || !feedback.recommed) {
        return alert("Please enter feedback!");
      }
      await ClientAPI.post("addFeedback", feedback);
      alert("Your Feedback will be reviewed!");
    } catch (error) {
      alert("Failed to add feedback");
    }
  };
  //drop down function
  const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // feedback function 
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
  
  const handleFeedBackButtonClick = () => {
    setShowFeedbackForm(true);
  };

  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false);
  };
// route page
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
//logout function 
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
          <button onClick={handleHomeButtonClick}><img src="/home.png" style={{ width: '50px', height: '50px' }} alt="Home"></img><div className='image-info'>&#160;Home&#160;</div></button>
        </div>
        <div className="nav-link">
          <button onClick={handleAboutButtonClick}><img src="/about.png" style={{ width: '50px', height: '50px' }} alt="About"></img><div className='image-info'>&#160;About&#160;</div></button>
        </div>
        <div className='nav-link'>
          <button onClick={handleCourseButtonClick}><img src="/search.png" style={{ width: '50px', height: '50px' }} alt="place holder course"></img><div className='image-info'>&#160;Courses&#160;</div></button>
        </div>


        {Cookies.get("userID") && (
        <div className="nav-link">
          <button onClick={handleFeedBackButtonClick}><img src="/feedback.png" style={{ width: '50px', height: '50px' }} alt="Feedback"></img><div className='image-info'>&#160;FeedBack&#160;</div></button>
        </div>)}
        <div className="nav-link">
          <button onClick={handleLoginButtonClick}><img src="/login_icon.png" style={{ width: '50px', height: '50px' }} alt="Login"></img>          {Cookies.get("userID") === undefined ? (
          <div className='image-info'>&#160;Account&#160;</div>
          ):(
          <div className="image-info account-link">
            <div className='link'>
              {(Cookies.get("isAdmin") !== undefined && Cookies.get("isAdmin") === '1')? (
                  <a href="/adminDashboard">
                    {/* <img src="dashboard.png" style={{ width: '20px', height: '20px' }} alt="Dashboard"></img> */}
                    &#160;Dashboard
                  </a>
                ):(<a href="/profile">
                <img src="login_icon.png" style={{ width: '20px', height: '20px' }} alt="Profile"></img>
                Profile</a>)}
              <div className='line'></div>
              <a href="#">
                <img src="setting.png" style={{ width: '20px', height: '20px' }} alt="Setting"></img>
                Setting</a>
              <div className='line'></div>
              <a onClick={handleLogOut} href="#">
                <img src="logout.png" style={{ width: '20px', height: '20px' }} alt="Logout"></img>
                Log Out </a>
            </div>
          </div>
          )}
          </button>
        </div>

      </div>
      {showFeedbackForm && (
        <div className='feedback' ref={feedbackFormRef}>
          <form id="form" onSubmit={handleSubmit}>
            <button className='close_button' onClick={handleCloseFeedbackForm}><img src="close_feedback.png" style={{ width: '30px', height: '30px' }} alt="close"></img></button>
            <h1>CourseView Survey Form</h1>
            {/* Details */}
            <div className="form-control">
              <label className="name" id="label-name">
                <strong>Name</strong>
              </label>
              <div>
                {/* Input Type Text */}
                <input type="text" id="name" placeholder="Enter your name" 
                value={feedback.name}
                onChange={(e) => handleInputChange(e, "name")} required />
                <span />
              </div>
            </div>

            <div className="form-control">
              <label className="role" id="label-role">
                <strong>Which option best describes you?</strong>
              </label>
              {/* Dropdown options */}
              <select name="role" id="role"
              value={feedback.role}
              onChange={(e) => handleInputChange(e, "role")}
              required 
              >
                <option value="student">Student</option>
                <option value="professional">Professor</option>
                <option value="other">Not Student nor Professor</option>
              </select>
            </div>
            <div className="form-control">
              <label className="type" id="type">
                <strong>Feedback Type</strong>
              </label>
              {/* Input Type Email*/}
              <div>
                <input type="text" id="type" placeholder="What is the problem?" 
                value={feedback.type}
                onChange={(e) => handleInputChange(e, "type")}
                required />
                <span />
              </div>
            </div>
            <div className="form-control">
              <label className="comment"><strong>Any comments or suggestions</strong></label>
              {/* multi-line text input control */}
              <textarea
                name="comment"
                id="comment"
                placeholder="Enter your comment here"
                value={feedback.comment}
                  onChange={(e) => handleInputChange(e, "comment")}
                  required
              />
            </div>
            <div id='recommed' className="form-control">
              <label><strong>Would you recommend CourseView to a friend?</strong></label>
              {/* Input Type Radio Button */}
              <label className="recommend-1">
                <input type="radio" id="recommend-1" name="recommend" 
                checked={feedback.recommed === "Yes"} 
                Value="Yes"
                onChange={(e) => handleInputChange(e, "recommed")}/>
                &nbsp; Yes
              </label>
              <label className="recommend-2">
                <input type="radio" id="recommend-2" name="recommend"
                Value="No"
                checked={feedback.recommed === "No"} 
                onChange={(e) => handleInputChange(e, "recommed")} />
                &nbsp; No
              </label>
              <label className="recommend-3">
                <input type="radio" id="recommend-3" name="recommend" 
                checked={feedback.recommed === "Maybe"} 
                Value="Maybe"
                onChange={(e) => handleInputChange(e, "recommed")}/>
                &nbsp; Maybe
              </label>
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

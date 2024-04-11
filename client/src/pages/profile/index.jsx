import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ClientAPI from '../../api/clientAPI';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';


export const Profile = () => {
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [userSchool, setUserSchool] = useState("");
  const [userMajor, setUserMajor] = useState("");
  const [userMinor, setUserMinor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState([]);


  useEffect(() => {
    async function fetchUserFullName() {
      try {
        const data = { userID: Cookies.get("userID") };
        const respond = await ClientAPI.post("getUserFullName", data);
        setUserFullName(respond.data.fullName);
        setUserEmail(respond.data.email);
        setUserPhone(respond.data.phone);
        setUserDepartment(respond.data.department);
        setUserMajor(respond.data.major);
        setUserMinor(respond.data.minor);
        setUserSchool(respond.data.school)
      } catch (error) {
        console.error("Error fetching user's full name:", error);
      }
    }

    if (Cookies.get("userID")) {
      fetchUserFullName();
    }
  }, [Cookies.get("userID")]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const deleteUser  = async (event, userID) => {
    event.preventDefault();
    try {
        const data = {
            userID: userID,
        }
        await ClientAPI.post("deleteUser", data);
        alert("Deleted Successfully");
        handleLogOut();
        // // Update comments state after deletion
        // const updatedUser = user.filter(userFullName => userFullName.id !== userID);
        // setUser(updatedUser);
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user: " + error.message);
    }
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
    navigate('/login');

  }
  catch (err) {
    //console.log("From HeaderLogOut.jsx: ", err);
    alert("Log Out got Error.")
  }
};
  const updateUserProfile = async () => {
    try {
      const data = {
        userID: Cookies.get("userID"),
        fullName: userFullName,
        email: userEmail,
        phone: userPhone,
        department: userDepartment,
        major: userMajor,
        minor: userMinor,
        school: userSchool
      };
      console.log(data);
      await ClientAPI.post("updateUser", data); // Change this to your API endpoint
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating user's data:", error);
      // Handle error appropriately
    }
  };
  const handleDoneClick = () => {
    updateUserProfile(); // Call the function to update user profile
    setIsEditing(false);
  };

  return (
    <div className='container'>
      <div className="wrapper">
        <div className="left">
          <img src="picture.png" alt="user" width={100} />
          <h3>{userFullName}</h3>
          <div className='profile-button'>
            <button className='edit' onClick={handleEditClick}>Edit Profile</button>
            {Cookies.get("userID") &&
            <button className='remove' onClick={(e) => deleteUser(e, Cookies.get("userID"))}>Remove Account</button>}
          </div>
        </div>
        <div className="right">
          <div className="info">
            <h3>Information</h3>
            <div className="info_data">
              <div className='row'>
                <div className="data1">
                  <h4>Email</h4>
                  {isEditing ? (
                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                  ) : (
                    <p>{userEmail}</p>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className="data2">
                  <h4>Phone</h4>
                  {isEditing ? (
                    <input type="text" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
                  ) : (
                    <p>{userPhone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="projects">
            <h3>Academic</h3>
            <div className="projects_data">
              <div className='row'>
                <div className="data1">
                  <h4>Department</h4>
                  {isEditing ? (
                    <input type="text" value={userDepartment} onChange={(e) => setUserDepartment(e.target.value)} />
                  ) : (
                    <p>{userDepartment}</p>
                  )}
                </div>
                <div className="data2">
                  <h4>School year</h4>
                  {isEditing ? (
                    <input type="text" value={userSchool} onChange={(e) => setUserSchool(e.target.value)} />
                  ) : (
                    <p>{userSchool}</p>
                  )}

                </div>
              </div>
              <div className='row'>
                <div className="data3">
                  <h4>Major</h4>
                  {isEditing ? (
                    <input type="text" value={userMajor} onChange={(e) => setUserMajor(e.target.value)} />
                  ) : (
                    <p>{userMajor}</p>
                  )}
                </div>
                <div className="data4">
                  <h4>Minor</h4>
                  {isEditing ? (
                    <input type="text" value={userMinor} onChange={(e) => setUserMinor(e.target.value)} />
                  ) : (
                    <p>{userMinor}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='done-button'>
          {isEditing && (
              <button className='done' onClick={handleDoneClick}>Done</button>
            )}
            </div>
        </div>
      </div>
    </div>
  );
}

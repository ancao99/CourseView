import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import './profile.css';


export const Profile = () => {
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState(""); 
  useEffect(() => {
    async function fetchUserFullName() {
      try {
        const data = { userID: Cookies.get("userID") };
        const respond = await ClientAPI.post("getUserFullName", data);
        setUserFullName(respond.data.fullName);
        setUserEmail(respond.data.email)
      } catch (error) {
        console.error("Error fetching user's full name:", error);
      }
    }

    if (Cookies.get("userID")) {
      fetchUserFullName();
    }
  }, [Cookies.get("userID")]);

    return(
      
    <div className='profile'>
      {/* Sidenav */}
      <div className="sidenav">
        <div className="profile">
          <img
            src="https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png"
            alt=""
            width={100}
            height={100}
          />
          <div className="name">{userFullName}</div>
          <button>Edit</button>
        </div>
      </div>
      {/* End */}
      {/* Main */}
      <div className="main">
        <h2>IDENTITY</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit" />
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{userFullName}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{userEmail}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>Bali, Indonesia</td>
                </tr>
                <tr>
                  <td>Hobbies</td>
                  <td>:</td>
                  <td>Diving, Reading Book</td>
                </tr>
                <tr>
                  <td>Job</td>
                  <td>:</td>
                  <td>Web Developer</td>
                </tr>
                <tr>
                  <td>Skill</td>
                  <td>:</td>
                  <td>PHP, HTML, CSS, Java</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End */}
    </div>
    );
}

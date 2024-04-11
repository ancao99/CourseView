import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminUser.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const AdminUpdateUser = () => {
    const { userID } = useParams();
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        fullName: '',
        email: '',
        phone: '',
        department: '',
        major: '',
        minor: '',
        school: ''
    });

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = {
                    userID: userID,
                };
                const response = await ClientAPI.post("getUserDetail", data);
                const userData = MySecurity.decryptedData(response.data);
                setInputValues(userData);
            }
            catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        }
        fetchUserData();
    }, [userID]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleCancelEdit = () => {
        navigate("/adminUser");
    };

    const handleEditUser = async (event) => {
        event.preventDefault();
        try {
            const response = await ClientAPI.post("updateUser", inputValues);
            if (response.data !== null && response.data !== undefined) {
                navigate("/adminUser");
            }
        }
        catch (err) {
            console.error("Failed to edit user:", err);
        }
    };


    return (
        <section id="content" className='adminPage'>
            <Sidebar />
            <Navbar />
            <main>
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Edit User</h1>
                        <ul class="breadcrumb">

                            <li>
                                <a class="active" href="/adminUser">User</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Edit</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="updateProduct"> 
    <form onSubmit={handleEditUser} encType="multipart/form-data" className="form-container">
        <div className="form-group">
            <label htmlFor="fullName">Name:</label>
            <input
                type="text"
                id="fullName"
                name="fullName"
                value={inputValues.fullName}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                name="email"
                value={inputValues.email}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="phone">Phone number:</label>
            <input
                type="text"
                id="phone"
                name="phone"
                value={inputValues.phone}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
                type="text"
                id="department"
                name="department"
                value={inputValues.department}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="major">Major:</label>
            <input
                type="text"
                id="major"
                name="major"
                value={inputValues.major}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="minor">Minor:</label>
            <input
                type="text"
                id="minor"
                name="minor"
                value={inputValues.minor}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="school">School Year:</label>
            <input
                type="text"
                id="school"
                name="school"
                value={inputValues.school}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="button-group">
            <button
                type="button"
                name="cancelEditUser"
                onClick={handleCancelEdit}
                style={{ marginRight: '10px' }}
            >
                Cancel
            </button>
            <button type="submit" name="editUser">Edit User</button>
        </div>
    </form>
</div>

            </main>
        </section>
    );
};

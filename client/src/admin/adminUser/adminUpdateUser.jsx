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
    const [userData, setUserData] = useState(null);
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");

    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleCancelEdit = (event) => {
        event.preventDefault();
        navigate("/adminUser");
    };

    // update product
    const handleEditUser = async (event) => {
        event.preventDefault();
        // Submit change
        try {
            let data = {
                ...inputValues,
            }
            const respond = await ClientAPI.post("updateClient", data);
            if (respond.data !== null && respond.data !== undefined) {
                //alert("Edited: ")
                navigate("/adminUser")
            }
        }
        catch (err) {
            alert("Can not Edit", err)
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = {
                    userID: userID
                };
                console.log({data})
                // get information
                const respond = await ClientAPI.post("getClientDetail", data);
                console.log({respond})
                let userData = MySecurity.decryptedData(respond.data);
                setInputValues({
                    userID: userID,
                    fullName: userData.fullName,
                    email: userData.email,
                    phone: userData.phone,
                    department: userData.department,
                    major: userData.major,
                    minor: userData.minor,
                    school: userData.school,
                });
            }
            catch (err) {
                alert("Can not Fetch", err)
                console.log({err})
            }
        }
        fetchData();
    }, []);


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

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
    const { termID } = useParams();
    const [termName, setTermName] = useState('');
    const navigate = useNavigate();
    const [termData, setTermData] = useState(null);
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
    const handleEditTerm = async (event) => {
        event.preventDefault();
        // Submit change
        try {
            let data = {
                ...inputValues,
            }
            const respond = await ClientAPI.post("updateTerms", data);
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
                    termID: termID,
                };
                // get information
                const respond = await ClientAPI.post("getTermsDetail", data);
                let termData = MySecurity.decryptedData(respond.data);
                setInputValues({
                    termID: termID,
                    name: termData.name,
                });
            }
            catch (err) {
                alert("Can not Fetch", err)
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
                                <a href="#">User</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="/adminUser">Home</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Edit</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="updateProduct"> 
                    <form onSubmit={handleEditTerm} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label htmlFor="name" style={{ marginLeft: '30px' }}>Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={inputValues.name}
                            onChange={handleInputChange}
                            required
                        />
                         <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={inputValues.email}
                            onChange={handleInputChange}
                            required
                        />
                         <label htmlFor="department">Department:</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={inputValues.name}
                            onChange={handleInputChange}
                            required
                        />
                         <label htmlFor="major">Major:</label>
                        <input
                            type="text"
                            id="major"
                            name="major"
                            value={inputValues.name}
                            onChange={handleInputChange}
                            required
                        />
                         <label htmlFor="name">Term Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={inputValues.name}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="name">Term Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={inputValues.name}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="name">Term Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={inputValues.name}
                            onChange={handleInputChange}
                            required
                        />

                        <button
                            type="button"
                            name="cancelEditUser"
                            onClick={handleCancelEdit}
                            style={{ marginRight: '10px' }}
                        >
                            Cancel
                        </button>
                        <button type="submit" name="editUser">Edit User</button>
                    </form>
                </div>
            </main>
        </section>
    );
};

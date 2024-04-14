import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminFeedback.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const AdminUpdateFeedback = () => {
    const { feedbackID } = useParams();
    const navigate = useNavigate();
    const [feedbackData, setFeedbackData] = useState(null);
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
        navigate("/adminFeedback");
    };

    // update product
    const handleEditFeedback = async (event) => {
        event.preventDefault();
        // Submit change
        try {
            let data = {
                ...inputValues,
            }
            const respond = await ClientAPI.post("updateFeedback", data);
            if (respond.data !== null && respond.data !== undefined) {
                //alert("Edited: ")
                navigate("/adminFeedback")
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
                    feedbackID: feedbackID
                };
                console.log({data})
                // get information
                const respond = await ClientAPI.post("getFeedbackDetail", data);
                console.log({respond})
                let feedbackData = MySecurity.decryptedData(respond.data);
                setInputValues({
                    feedbackID: feedbackID,
                    edit: feedbackData.edit,
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
                        <h1>Admin Comment</h1>
                        <ul class="breadcrumb">

                            <li>
                                <a class="active" href="/adminFeedback">Feedback</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Comment</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="updateProduct"> 
    <form onSubmit={handleEditFeedback} encType="multipart/form-data" className="form-container">
        
        <div className="form-group">
            <label htmlFor="edit">Comment:</label>
            <input
                type="text"
                id="edit"
                name="edit"
                value={inputValues.edit}
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
            <button type="submit" name="editUser">Edit Feedback</button>
        </div>
    </form>
</div>

            </main>
        </section>
    );
};

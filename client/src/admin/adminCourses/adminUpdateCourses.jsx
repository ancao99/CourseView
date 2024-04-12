import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminCourses.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const AdminUpdateCourses = () => {
    const { courseID } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState(null);

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
        navigate("/adminCourses");
    };

    const handleEditCourses = async (event) => {
        event.preventDefault();
        // Submit change
        try {
            let data = {
                ...inputValues,
            }
            const respond = await ClientAPI.post("updateCourses", data);
            if (respond.data !== null && respond.data !== undefined) {
                //alert("Edited: ")
                navigate("/adminCourses")
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
                    courseID: courseID,
                };
                // get information
                const respond = await ClientAPI.post("getCoursesDetail", data);
                let courseData = MySecurity.decryptedData(respond.data);
                setInputValues({
                    courseID: courseID,
                    crn: courseData.crn,
                    subject: courseData.subject,
                    courseNumber: courseData.courseNumber,
                    section: courseData.section,
                    hours: courseData.hours,
                    title: courseData.title,
                    professor: courseData.professor,
                    schedule_type: courseData.schedule_type,
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
                        <h1>Edit Courses</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Courses</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="/adminCourses">Home</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Edit</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="updateProduct">
                    <form onSubmit={handleEditCourses} encType="multipart/form-data">
                        <label htmlFor="name">CRN:</label>
                        <input
                            type="text"
                            id="crn"
                            name="crn"
                            value={inputValues.crn}
                            onChange={handleInputChange}
                            required
                        /><br />

                        <label htmlFor="name">Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={inputValues.subject}
                            onChange={handleInputChange}
                            required
                        /><br />

                        <label htmlFor="name">Course Number:</label>
                        <input
                            type="text"
                            id="courseNumber"
                            name="courseNumber"
                            value={inputValues.courseNumber}
                            onChange={handleInputChange}
                            required
                        /><br />

                        <label htmlFor="name">Section:</label>
                        <input
                            type="text"
                            id="section"
                            name="section"
                            value={inputValues.section}
                            onChange={handleInputChange}
                            required
                        /><br />

                        <label htmlFor="name">Hours:</label>
                        <input
                            type="text"
                            id="hours"
                            name="hours"
                            value={inputValues.hours}
                            onChange={handleInputChange}
                            required
                        /><br />

                        <label htmlFor="name">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={inputValues.title}
                            onChange={handleInputChange}
                            required
                        /><br />

                        <label htmlFor="name">Professor:</label>
                        <input
                            type="text"
                            id="professor"
                            name="professor"
                            value={inputValues.professor}
                            onChange={handleInputChange}
                            required
                        /><br />

                        <label htmlFor="name">Schedule Type:</label>
                        <input
                            type="text"
                            id="schedule_type"
                            name="schedule_type"
                            value={inputValues.schedule_type}
                            onChange={handleInputChange}
                            required
                        /><br />

                        <button
                            type="button"
                            name="cancelEditTerm"
                            onClick={handleCancelEdit}
                            style={{ marginRight: '10px' }}
                        >
                            Cancel
                        </button>
                        <button type="submit" name="editTerm">Save</button>
                    </form>
                </div>
            </main>
        </section>
    );
};

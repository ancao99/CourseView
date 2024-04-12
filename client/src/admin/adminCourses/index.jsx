import React, { useState, useEffect } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminCourses.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import CourseAPI from '../../api/courseAPI.js';

export const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 20;
    const indexOfLastCourses = currentPage * coursesPerPage;
    const indexOfFirstCourses = indexOfLastCourses - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourses, indexOfLastCourses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [terms, setTerms] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [visiblePages, setVisiblePages] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");
    }, []);



    useEffect(() => {
        async function fetchCourses() {
            try {
                const data = { limit: coursesPerPage, page: currentPage };
                const response = await ClientAPI.post("getCourses", data);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching Courses:", error);
            }
        }

        fetchCourses();
    }, [currentPage]);

    const paginate = pageNumber => {
        const totalPages = Math.ceil(courses.length / coursesPerPage);
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const calculateVisiblePages = (currentPage, totalPages) => {
        const range = 2; // Number of pages to show before and after the current page
        let start = Math.max(1, currentPage - range);
        let end = Math.min(totalPages, currentPage + range);

        if (currentPage - range <= 1) {
            end = Math.min(totalPages, 1 + 2 * range);
        }
        if (currentPage + range >= totalPages) {
            start = Math.max(1, totalPages - 2 * range);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    useEffect(() => {
        const totalPages = Math.ceil(courses.length / coursesPerPage);
        setVisiblePages(calculateVisiblePages(currentPage, totalPages));
    }, [currentPage, courses]);

    async function fetchCourses() {
        try {
            const data = { limit: coursesPerPage, page: currentPage };
            const response = await ClientAPI.post("getCourses", data);
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching Courses:", error);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [currentPage]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddCourses = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const crn = formData.get('crn');
            const subject = formData.get('subject');
            const courseNumber = formData.get('courseNumber');
            const section = formData.get('section');
            const hours = formData.get('hour'); 
            const title = formData.get('title');
            const professor = formData.get('professor');
            const schedule_type = formData.get('schedule_type');
    
            const data = {
                crn: parseInt(crn),
                subject: subject,
                courseNumber: parseInt(courseNumber),
                section: parseInt(section),
                hours: hours,
                title: title,
                professor: professor,
                schedule_type: schedule_type,
            };
            console.log(data)
            const response = await ClientAPI.post("addCourses", data);
            console.log('Response:', response.data);
            await fetchCourses();
        } catch (error) {
            console.error("Error adding course:", error);
            console.log("Error details:", error.response.data);
        }
        closeModal();
    };
    
    


    const removeCourses = async (event, courseID) => {
        event.preventDefault();
        try {
            const data = {
                courseID: courseID,
            }
            await ClientAPI.post("deleteCourses", data);
            alert("Deleted Courses Successfully");
            await fetchCourses();
        } catch (error) {
            console.error("Error deleting Courses:", error);
            alert("Error deleting Courses: " + error.message);
        }
    }

    useEffect(() => {
        const modalForm = document.getElementById("addModal");

        if (modalForm) {
            if (isModalOpen) {
                modalForm.style.display = "block";
            } else {
                modalForm.style.display = "none";
            }
        }
    }, [isModalOpen]);

    return (
        <section id="content" className='adminPage course'>
            <Sidebar />
            <Navbar />
            <main className="content-main-product">
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Courses</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Courses</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <table id="items-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CRN</th>
                            <th>Subject</th>
                            <th>Course Number</th>
                            <th>Section</th>
                            <th>Hours</th>
                            <th>Title</th>
                            <th>Professor</th>
                            <th>Schedule Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCourses.map((courses) => (
                            <tr key={courses.id}>
                                <td>{courses.id}</td>
                                <td>{courses.crn}</td>
                                <td>{courses.subject}</td>
                                <td>{courses.courseNumber}</td>
                                <td>{courses.section}</td>
                                <td>{courses.hours}</td>
                                <td>{courses.title}</td>
                                <td>{courses.professor}</td>
                                <td>{courses.schedule_type}</td>
                                <td>
                                    <a class="edit" role="button" href={`adminUpdateCourses/${courses.id}`}>
                                        Edit
                                    </a>
                                    <form method="post" action="">
                                        <button class="delete" onClick={(e) => removeCourses(e, courses.id)}>
                                            Delete
                                        </button>
                                    </form>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <button id="add-btn" onClick={openModal}>
                    Add New
                </button>

                {isModalOpen && (
                    <div id="addModal" className="modal-form">
                        <div id="popup-form" className="popup">
                            <h2 style={{ textAlign: 'center', color: 'var(--blue)' }}>Add New Course</h2>
                            <br />
                            <form onSubmit={handleAddCourses} encType="multipart/form-data">
                                <label htmlFor="crn">CRN:</label>
                                <input required type="text" id="crn" name="crn" /><br />

                                <label htmlFor="subject">Subject:</label>
                                <input required type="text" id="subject" name="subject" /><br />

                                <label htmlFor="courseNumber">Course Number:</label>
                                <input required type="text" id="courseNumber" name="courseNumber" /><br />

                                <label htmlFor="section">Section:</label>
                                <input required type="text" id="section" name="section" /><br />

                                <label htmlFor="hour">Hour:</label>
                                <input required type="text" id="hour" name="hour" /><br />

                                <label htmlFor="title">Title:</label>
                                <input required type="text" id="title" name="title" /><br />

                                <label htmlFor="professor">Professor:</label>
                                <input required type="text" id="professor" name="professor" /><br />

                                <label htmlFor="schedule_type">Schedule Type:</label>
                                <input required type="text" id="schedule_type" name="schedule_type" /><br />

                                <button id="close-btn" type="button" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="submit" name="addProduct">
                                    Add New
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <br /><br />
                <div className='page-number-admin'>
                    <div aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href={`#${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            {visiblePages.map((number) => (
                                <li key={number} className="page-item">
                                    <a onClick={() => paginate(number)} href={`#${number}`} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                                        {number}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage >= Math.ceil(courses.length / coursesPerPage) ? 'disabled' : ''}`}>
                                <a className="page-link" href={`#${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </section>
    );
};


<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminFeedback.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import CourseAPI from '../../api/courseAPI.js';

export const AdminFeedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const feedbackPerPage = 20;
    const indexOfLastFeedback = currentPage * feedbackPerPage;
    const indexOfFirstFeedback= indexOfLastFeedback - feedbackPerPage;
    const currentFeedback = feedback.slice(indexOfFirstFeedback, indexOfLastFeedback);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [visiblePages, setVisiblePages] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");
    }, []);

    

    useEffect(() => {
        async function fetchFeedback() {
            try {
                const data = { limit: feedbackPerPage, page: currentPage };
                const response = await ClientAPI.post("getFeedback", data); // Updated method name
                setFeedback(response.data);
            } catch (error) {
                console.error("Error fetching Feedback:", error);
            }
        }
    
        fetchFeedback();
    }, [currentPage]);
    

    const paginate = pageNumber => {
        const totalPages = Math.ceil(feedback.length / feedbackPerPage);
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
        const totalPages = Math.ceil(feedback.length / feedbackPerPage);
        setVisiblePages(calculateVisiblePages(currentPage, totalPages));
    }, [currentPage, feedback]);

    async function fetchFeedback() {
        try {
            const data = { limit: feedbackPerPage, page: currentPage };
            const response = await ClientAPI.post("getFeedback", data);
            setFeedback(response.data);
        } catch (error) {
            console.error("Error fetching Feedback:", error);
        }
    }

    async function fetchUser() {
        try {
            const data = { limit: feedbackPerPage, page: currentPage };

            const response1 = await ClientAPI.post("getClient", data);
            setUsers(response1.data);



        } catch (error) {
            console.error("Error fetching User:", error);
        }
    }

    useEffect(() => {
        fetchFeedback();
        fetchUser();
    }, [currentPage]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    /*            
    const handleAddCourses = async (event) => {
                event.preventDefault();
                try {
                    const formData = new FormData();
                    
                    const file = event.target.elements.excelFile.files[0]; // Get the uploaded file
                    const terms = event.target.elements.terms.value; // Get the selected term
                    const departments = event.target.elements.departments.value; // Get the selected department
                    
                    formData.append('terms', terms);
                    formData.append('departments', departments);
                    formData.append('excelFile', file);
                    
                    console.log('terms', terms);
                    console.log('departments', departments);
                    console.log('excelFile', file);
                    
                    console.log("Data sent to server:", formData);
                    
                    const response = await ClientAPI.post("addCourses", formData);
                    console.log("Response from server:", response);
                    
                    // If the response is successful, fetch updated courses
                    if (response && response.data) {
                        await fetchCourses();
                    } else {
                        console.error("Invalid response from server:", response);
                    }
                } catch (error) {
                    console.error("Error adding Courses:", error);
                    console.log("Error details:", error.response?.data);
                }
                closeModal();
            }; 
            */



    const removeFeedback = async (event, feedbackID) => {
        event.preventDefault();
        try {
            const data = {
                feedbackID: feedbackID,
            }
            await ClientAPI.post("deleteFeedback", data);
            alert("Deleted Feedback Successfully");
            await fetchFeedback();
        } catch (error) {
            console.error("Error deleting Feedback:", error);
            alert("Error deleting Feedback: " + error.message);
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
                        <h1>Feedback</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a class="active" href="#">Feedback</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <table id="items-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User name</th>
                            <th>Role</th>
                            <th>Type</th>
                            <th>Comment</th>
                            <th>Admin Comment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFeedback.map((feedback) => (
                            <tr key={feedback.id}>
                                <td>{feedback.id}</td>
                                <td>{feedback.userFullName}</td>
                                <td>{feedback.role}</td>
                                <td>{feedback.type}</td>
                                <td>{feedback.comment}</td>
                                <td>{feedback.edit}</td>
                                <td>
                                    {/* <a class="edit" role="button" href={`adminUpdateCourses/${courses.id}`}>
                                        Edit
                                    </a> */}
                                    <form method="post" action="">
                                        <button class="delete" onClick={(e) => removeFeedback(e, feedback.id)}>
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <button id="add-btn" onClick={openModal}>
                    Add New
                </button>

                {isModalOpen && (
                    <div id="addModal" className="modal-form">
                        <div id="popup-form" className="popup">
                            <h2 style={{ textAlign: 'center', color: 'var(--blue)' }}>Add Data</h2>
                            <br />
                            <form onSubmit={handleAddCourses} encType="multipart/form-data">
                                <label htmlFor="terms">Select Terms:</label>
                                <select id="terms" name="terms">
                                    {terms.map((term) => (
                                        <option key={term.id} value={term.id}>{term.name}</option>
                                    ))}
                                </select><br />
                                <label htmlFor="departments">Select Departments:</label>
                                <select id="departments" name="departments">
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))}
                                </select><br />


                                <label htmlFor="file">Upload Excel File: </label><br />
                                <input type="file" id="file" name="excelFile" accept=".xlsx, .xls" /><br /><br />

                                <button id="close-btn" type="button" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="submit" name="addProduct">
                                    Submit
                                </button>

                            </form>
                        </div>
                    </div>
                )} */}
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
                            <li className={`page-item ${currentPage >= Math.ceil(feedback.length / feedbackPerPage) ? 'disabled' : ''}`}>
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
=======
  
>>>>>>> 846aab61 (...)
=======
  
>>>>>>> 1a694d21a9f52257c11076a13fa7cbb5bab38420

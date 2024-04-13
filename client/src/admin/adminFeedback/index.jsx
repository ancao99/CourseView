import React, { useState, useEffect } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import "./adminFeedback.css";

export const AdminFeedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const feedbackPerPage = 10;
    const indexOfLastFeedback = currentPage * feedbackPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
    const currentFeedback = feedback.slice(indexOfFirstFeedback, indexOfLastFeedback);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");
    }, []);

    async function fetchFeedback() {
        try {
            const data = { limit: feedbackPerPage, page: currentPage };
            const response = await ClientAPI.post("getFeedback", data);
            setFeedback(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    useEffect(() => {
        fetchFeedback();
    }, [currentPage]);

    const paginate = pageNumber => {
        if (pageNumber < 1 || pageNumber > Math.ceil(feedback.length / feedbackPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const removeFeedback = async (event, feedbackID) => {
        event.preventDefault();
        try {
            const data = {
                feedbackID: feedbackID,
            }
            await ClientAPI.post("deleteFeedback", data);
            alert("Deleted feedback Successfully");
            await fetchFeedback();
        } catch (error) {
            console.error("Error deleting feddback:", error);
            alert("Error deleting feedback: " + error.message);
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
        <section id="content" className='adminPage terms'>
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
                            <th>Name</th>
                            <th>Role</th>
                            <th>Type</th>
                            <th>Commend</th>
                            <th>Recommend</th>
                            <th>Admin Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFeedback.map((feedback) => (
                            (!feedback.isAdmin) && (
                            <tr key={feedback.id}>
                                <td>{feedback.id}</td>
                                <td>{feedback.name}</td>
                                <td>{feedback.role}</td>
                                <td>{feedback.type}</td>
                                <td>{feedback.comment}</td>
                                <td>{feedback.edit}</td>
                                <td className="grid-container"> {/* Changed 'class' to 'className' */}
                                    <a className="edit" role="button" href={`}`}>
                                        Edit
                                    </a>
                                    <form method="post" action="">
                                        <button className="delete" onClick={(e) => removeFeedback(e, feedback.id)}>
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>)
                        ))}

                    </tbody>
                </table>
                <br /><br />
                <div className='page-number-admin'>
                    <div aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href={`#${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            {[...Array(Math.ceil(feedback.length / feedbackPerPage)).keys()].map((number, index) => (
                                <li key={index} className="page-item">
                                    <a onClick={() => paginate(number + 1)} href={`#${number + 1}`} className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}>
                                        {number + 1}
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

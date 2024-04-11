import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMemo } from 'react';

import FeedbackRating from './feedback';
import SearchBar from './search';
import CourseModal from './courseModal';
import CourseFeedbackModal from './courseFeedbackModal';
import {CourseData} from './courses_array';
import './courses.css';

//Left off at executive mba
const courses = CourseData;

const CourseList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [filteredCourses, setFilteredCourses] = useState([]);
    
    const [selectedCourse, setSelectedCourse] = useState(null); // State variable to store selected course
    

    //This is used to make the default page blank when there is nothing in the search bar
    useEffect(() => {
        if (searchQuery === '') {
          setFilteredCourses([]);
        }
      }, [searchQuery]);

    /*
    // Memoize the filtering function
    const filterCourses = memoize((query, courses) => {
      return courses.filter(([crn, subject, courseNumber, section, hours, title, professor, schedule_type]) =>
        title.toLowerCase().includes(query.toLowerCase()) ||
        courseNumber.toString().includes(query) || crn.toString().includes(query) || professor.toLowerCase().includes(query.toLowerCase())
      );
    });
    */
   /*
    //Handles User input from search bar
    const handleSearch = (query) => {
        setSearchQuery(query);
        /*
        const filtered = courses.filter(([crn, subject, courseNumber, section, hours, title, professor, schedule_type]) =>
          title.toLowerCase().includes(query.toLowerCase()) ||
          courseNumber.toString().includes(query) || crn.toString().includes(query) || professor.toLowerCase().includes(query.toLowerCase())
        );
        
        /*
        const filtered = courses.filter(([crn, subject, courseNumber, section, hours, title, professor, schedule_type]) =>
          title.toLowerCase().includes(query.toLowerCase()) ||
          courseNumber.toString().includes(query) 
        );
        
        const filtered = filterCourses(query, courses);
        setFilteredCourses(filtered);
    };
    */

    const filterCourses = (query, courses) => {
      return courses.filter(([crn, subject, courseNumber, section, hours, title, professor, schedule_type]) =>
        title.toLowerCase().includes(query.toLowerCase()) ||
        courseNumber.toString().includes(query) || 
        crn.toString().includes(query) || 
        professor.toLowerCase().includes(query.toLowerCase())
      );
    };
  
    // Memoize the filteredCourses value
    const memoizedFilteredCourses = useMemo(() => {
      return filterCourses(searchQuery, courses);
    }, [searchQuery]);
  
    const handleSearch = (query) => {
      setSearchQuery(query);
      setFilteredCourses(memoizedFilteredCourses);
    };

    //Send data from a course to the modal/pop up box
    const handleOpenModal = (course) => {
      setSelectedCourse(course);
    };

    const handleSubmitFeedback = (ratings) => {
      // Handle submission logic here, such as sending the data to a server
      console.log('Received ratings:', ratings);
      
    };
    
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
            </div>
            <div className="col">
              <div className="course-list">
                {filteredCourses.length > 0 ? (
                  <div className='row'>
                    <h1>Course List</h1>
                    {filteredCourses.map(([crn, subject, courseNumber, section, hours, title, professor, schedule_type]) => (
                      <div key={crn} className="course-item">
                        <h4>{title}</h4>
                        <p>Subject: {subject}</p>
                        <p>CRN: {crn}</p>
                        <p>Course Number: {courseNumber}</p>
                        <p>Professor: {professor}</p>
                        <br></br>
                        <br></br>
                        <button 
                          type="button" 
                          className="viewFeedBackBtn btn btn-primary" 
                          data-bs-toggle="modal" 
                          data-bs-target="#viewCourseFeedback"
                          onClick={() => handleOpenModal({ crn, subject, courseNumber, section, hours, title, professor, schedule_type })}
                          >
                            Feedback
                        </button>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div id='filler-intro'>
                    <h1>Courses will appear here</h1>
                    <p>Ready to locate your courses and give valuable feedback? </p>
                    <p>Start by typing in the search bar to the right!</p>
                    <p>Enter a Course Name, CRN, Course Number, or Professor</p>
                    
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {<CourseModal selectedCourse={selectedCourse}/>}
          {/* This is the modal(popup) box that will activate when user presses on the button*/}
          
          
        {<CourseFeedbackModal selectedCourse={selectedCourse} handleSubmitFeedback={handleSubmitFeedback}/>}
        {/*This is the modal for course feedback; Toggles with the other modal above when the button in the modal above is pressed*/}
      

        


        </div>
      );
    }
  export default CourseList
import React from 'react';
import './courses.css';
import NameSearch from './search';

import CourseView from './course_lists';

export const Courses = () => {
    return(
        <>
        
        <div className="layout">
           <CourseView/>
           
        </div>
        </>
    );
}

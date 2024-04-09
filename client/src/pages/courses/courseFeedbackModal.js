import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FeedbackRating from './feedback'

const courseFeedbackModal= ({ selectedCourse, handleSubmitFeedback }) =>{
    return(
        
        <div class="modal fade" id="course_feedback" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="course_feedback" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                {selectedCourse && (
                  <>
                    <h4 class="modal-title" id="viewCourseFeedback">{selectedCourse.title}</h4>
                  </>
                )}
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {selectedCourse &&(
                    <FeedbackRating onSubmit={handleSubmitFeedback} selectedCourse={selectedCourse.crn}/>
                )}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-target="#viewCourseFeedback" data-bs-toggle="modal">Go Back</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
              </div>
            </div>
          </div>
        </div>
    );
}
export default courseFeedbackModal;
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const courseModal = ({selectedCourse }) =>{

    return(
        <div class="modal fade" id="viewCourseFeedback" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="viewCourseFeedback" aria-hidden="true">
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
                <div className="feedback-container">
                  <div className="col">
                    {selectedCourse && (
                      <>
                        <div className="course-info">
                          <p><strong>Subject:</strong> {selectedCourse.subject}</p>
                        </div>
                        <div className="course-info">
                          <p><strong>CRN:</strong> {selectedCourse.crn}</p>
                        </div>
                        <div className="course-info">
                          <p><strong>Course Number:</strong> {selectedCourse.courseNumber}</p>
                        </div>
                        <div className="course-info">
                          <p><strong>Professor:</strong> {selectedCourse.professor}</p>
                        </div>
                        {/* Add more details as needed */}
                      </>
                    )}
                    <div className="feedback-comment">
                      <p>Student 1: </p>
                      <Rating name="read-only" value={4} readOnly />
                    </div>
                    <div className="feedback-comment">
                      <p>Student 2: </p>
                      <Rating name="read-only" value={4} readOnly />
                    </div>
                    <div className="feedback-comment">
                      <p>Student 3: </p>
                      <Rating name="read-only" value={4} readOnly />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h5>Feedback Rating:</h5>
                    <br></br>
                    <Typography component="legend">Overall</Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Course Content</Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Class Environment</Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Assignments and Assessments</Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Interaction and Engagement</Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Feedback and Support</Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Course Organization and Structure</Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Relevance and Practicality</Typography>
                    <Rating name="read-only" value={4} readOnly />
                  </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-target="#course_feedback" data-bs-toggle="modal">Add your own Feedback on this Course</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
}
export default courseModal;
import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { studentFeedbackTest } from './stuFeedback_array';

const CourseModal = ({selectedCourse }) =>{
  const [modalOpen, setModalOpen] = useState(false);
  const [ratings, setRatings] = useState({
    overall : 0,
    content:0, 
    environment:0, 
    assignments:0, 
    interaction:0, 
    feedback:0, 
    organization:0, 
    relevance:0
  });
  

  //add function to get avg feedback table / array
  //for now it does nothing
  /*
  const getFeedback = (crn) => {
    //Var that loads in avg feedback table from database from a return call of a function
    //If the data in Var is not already formatted in the same way as ratings then format it
    //return that var
  };
  */

  //add function to create appropriate values for Rating values
  //for now it does nothing
  
  /*
  const assignValue = (feedbackData) => {
    //In the format of ratings, assign feedbackData to an array
    //If feedbackData is not already formatted in the same way as ratings then format it
    //return the array
  };
  */
  
  const handleModalClose = () => {
    setModalOpen(false);
    clearRatings();
  }
  
  const handleModalOpen = (course) => {
    setModalOpen(true);
    clearRatings();
  }

  // Update ratings when selected course changes
  const clearRatings = () => {
    setRatings({
      overall: 0,
      content: 0,
      environment: 0,
      assignments: 0,
      interaction: 0,
      feedback: 0,
      organization: 0,
      relevance: 0
    });
  }

  useEffect(() => {
    if (selectedCourse) {
      // Fetch feedback data for the selected course
      //const feedbackData = getFeedback(selectedCourse.crn);

      // Calculate ratings based on feedback data
      //const newRatings = assignValue(feedbackData);

      handleModalOpen();
      const filteredFeedback = studentFeedbackTest.filter((feedback) => feedback.crn === selectedCourse.crn);
      if (filteredFeedback.length > 0) {
        const totalFeedback = filteredFeedback.length;
        const averageRatings = {
          content: 0,
          environment: 0,
          assignments: 0,
          interaction: 0,
          feedback: 0,
          organization: 0,
          relevance: 0
        };
  
        filteredFeedback.forEach(feedback => {
          Object.keys(averageRatings).forEach(key => {
            averageRatings[key] += parseInt(feedback[key], 10);
          });
        });
  
        Object.keys(averageRatings).forEach(key => {
          ratings[key] = Math.round(averageRatings[key] / totalFeedback);
        });
  
        // Update ratings state with the new averages
        setRatings({ ...ratings });
        const overallAvg = calculateMeanRating(ratings.content, ratings.environment, ratings.assignments, ratings.interaction, ratings.feedback, ratings.organization, ratings.relevance);
        setRatings({ ...ratings, overall: overallAvg });
      }

      
      // Update ratings state
      //setRatings(newRatings);
    }
  }, [selectedCourse, ratings, handleModalOpen]);
  
  const calculateMeanRating = (content, environment, assignments, interaction, feedback, organization, relevance) => {
    const ratings = [content, environment, assignments, interaction, feedback, organization, relevance];
    
    let total = 0;
    
    for (const key in ratings) {
      total += ratings[key];
    }
    console.log('Overall', Math.round( total / 7));
    return Math.round( total / 7);
  };

  //The studentFeedbackTest array is temporary, it will be replaced with the array that contains data form teh student feedback table from the database
  const filteredFeedback = selectedCourse
  ? studentFeedbackTest
      .filter((feedback) => feedback.crn === selectedCourse.crn)
      .map((feedback, index) => (
        <div key={index} className="feedback-comment">
          <h4>{feedback.student}: </h4>
          <Rating name="read-only" value={calculateMeanRating(feedback.content,feedback.assignments,feedback.environment,feedback.interaction,feedback.feedback,feedback.organization,feedback.relevance)} readOnly />
          <p>{feedback.free_form}</p>
        </div>
      ))
  : null;

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
              
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
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
                    <div>{filteredFeedback}</div>
                  </div>
                  <div className="col-md-4">
                    <h5>Feedback Rating:</h5>
                    <br></br>
                    <Typography component="legend">Overall</Typography>
                    <Rating name="read-only" value={ratings['overall']} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Course Content</Typography>
                    <Rating name="read-only" value={ratings['content']} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Class Environment</Typography>
                    <Rating name="read-only" value={ratings['environment']} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Assignments and Assessments</Typography>
                    <Rating name="read-only" value={ratings['assignments']} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Interaction and Engagement</Typography>
                    <Rating name="read-only" value={ratings['interaction']} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Feedback and Support</Typography>
                    <Rating name="read-only" value={ratings['feedback']} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Course Organization and Structure</Typography>
                    <Rating name="read-only" value={ratings['organization']} readOnly />
                    <br></br>
                    <br></br>
                    <Typography component="legend">Relevance and Practicality</Typography>
                    <Rating name="read-only" value={ratings['relevance']} readOnly />
                  </div>
                </div>
            </div>
            <div class="modal-footer">
              {/*If there is a variable/cookie that tracks if a user is logged in we can make the button fot add feedback display  */}
              <button type="button" class="btn btn-primary" data-bs-target="#course_feedback" data-bs-toggle="modal">Add your own Feedback on this Course</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
}
export default CourseModal;
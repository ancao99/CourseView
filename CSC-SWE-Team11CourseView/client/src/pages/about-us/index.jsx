import React from 'react';
import "./about-us.css";

// AboutUs component showcases our web development journey
export const AboutUs = () => {
  return (
    <>
    <div className='about-us'>
      {/* Main title */}
      <h1 className="about">About Our CourseView Website</h1>
      <p className='paragraph1'>Welcome to our CourseView Website, your go-to platform for insightful and comprehensive reviews of courses from previous semesters.</p>
      {/* Section 1: Mission */}
      <div className="section-1">
        <h2>Section 1: Our Mission</h2>
        <p className='paragraph'>At Course Review Web, our mission is to create a supportive online community where students can share their experiences, opinions, and recommendations 
        regarding the courses they have taken. <br/>We believe that by offering a platform for honest and transparent reviews, 
        we can empower students to make well-informed decisions about their academic journeys and contribute to the continuous improvement of educational standards.</p>
      </div>

      {/* Section 2: Highlighting the Project */}
      <div className="section-2">
        <h2>Section 2: What Sets Us Apart</h2>
        <p className='paragraph'>
        <strong>User-Centric Design:</strong> Our website is built with the user in mind. We leverage React.js to ensure a seamless and intuitive user experience, allowing users to navigate effortlessly through course listings, reviews, and other relevant information.<br/>
        <strong>Visual Appeal with Bootstrap:</strong> With Bootstrap, we combine functionality with aesthetic appeal, creating a visually stunning interface that is both modern and responsive across different devices and screen sizes.<br/>
        <strong>Community-Driven Content:</strong> Our platform thrives on user-generated content. By encouraging students to share their perspectives and insights, we foster a vibrant community where knowledge is freely exchanged and collaboration is encouraged.<br/>
        <strong>Objective Reviews:</strong> We prioritize objectivity and authenticity in our reviews. Users can expect unbiased assessments of courses, providing them with a balanced view of the strengths and weaknesses of each offering.</p>        
      </div>

      {/* Section 3: Showcasing the Technologies Used */}
      <div className="section-3">
        <h2>Section 3: How It Works</h2>
        <p className='paragraph'>
          <strong>Browse Courses:</strong> Explore our comprehensive database of courses from previous semesters. Filter by department, instructor, or keyword to find the courses that interest you.<br/>
          <strong>Read Reviews: </strong>Dive into detailed reviews written by fellow students who have firsthand experience with the courses. Gain valuable insights into course structure, workload, instructor effectiveness, and more.<br/>
          <strong>Write Your Own Review:</strong> Share your own experiences by writing a review of the courses you've taken. Your feedback will not only help other students but also contribute to the collective knowledge base of our community.</p>
      </div>

      {/* Section 4: Key Takeaways from the Class */}
      <div className="section-4">
        <h2>Section 4: Get Involved</h2>
        <p className='paragraph'>We believe that the strength of our platform lies in the participation of our users. Whether you're a student, instructor, or academic enthusiast, there are many ways to get involved:<br/>
          <strong>Write Reviews:</strong> Share your experiences and insights to help others make informed decisions.<br/>
          <strong>Join the Community:</strong> Participate in discussions, ask questions, and connect with like-minded individuals.<br/>
          <strong>Spread the Word:</strong> Help us grow our community by sharing our platform with your friends, classmates, and colleagues.
           <br/> Thank you for choosing Course Review Web. Together, let's make academic excellence accessible to all!</p>
      </div>
    </div>
    </>
  );
};
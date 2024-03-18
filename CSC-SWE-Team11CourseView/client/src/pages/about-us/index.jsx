import React from 'react';
import "./about-us.css";

// AboutUs component showcases our web development journey
export const AboutUs = () => {
  return (
    <>
    <div className='about-us'>
      {/* Main title */}
      <h1 className="about">About Us</h1>
      {/* Section 1: Introducing ourselves */}
      <div className="section-1">
        <h2>Section 1: Who We Are</h2>
      </div>

      {/* Section 2: Highlighting the Project */}
      <div className="section-2">
        <h2>Section 2: Project Description</h2>
        
      </div>

      {/* Section 3: Showcasing the Technologies Used */}
      <div className="section-3">
        <h2>Section 3: Technologies Used</h2>
        
      </div>

      {/* Section 4: Key Takeaways from the Class */}
      <div className="section-4">
        <h2>Section 4: Key Takeaways</h2>
      </div>
    </div>
    </>
  );
};
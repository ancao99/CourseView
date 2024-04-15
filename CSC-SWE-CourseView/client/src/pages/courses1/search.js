import React, { useState } from 'react';
import './courses.css';

const SearchBarName = ({ searchQuery, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form className={`search-bar ${isFocused ? 'focused' : ''}`} onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="course_name">Search Courses:</label>
      <br></br>
      <input
        type="search"
        name="course_name"
        id="course_name"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Ex: COMPUTER ORG, 88486, 1301, etc."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </form>
  );
};
  
export default SearchBarName;

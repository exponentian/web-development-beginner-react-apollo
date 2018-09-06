import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <span>React & Apollo Example: College</span>{' | '}
      <Link to='/professors'>Professors</Link>{' or '}
      <Link to='/courses'>Courses</Link>
      <hr />
    </div>
  )
}

export default Header;
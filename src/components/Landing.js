import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <h1>React & Apollo Example</h1>
    <h2>College</h2>
    <h3>Author: Ho Seok (Brandon) Oh</h3>

    <hr />
    
    <Link to='/professors'>Professors</Link>{' | '}
    <Link to='/courses'>Courses</Link>
  </div>
);

export default Landing;
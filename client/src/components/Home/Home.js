import React from 'react';
import './Home.css';


import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='Container'>
      
      <div className='Content'>
        <div className='SubContent'>
          <h1>Book Catolog</h1>
          <p>Manage your Books with Ease</p>
          <button type='button' className='btn btn-outline-dark'>
            <Link to='/register'>Get started</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config'; 

function Home() {

  return (
    <div className="home-container text-center">
      <h1 className="text-3xl font-bold">Welcome to the Blogging Platform</h1>
      <nav className="mt-4">

        <Link to="/register" className="text-blue-500 hover:underline mx-2">Register</Link>
        <Link to="/login" className="text-blue-500 hover:underline mx-2">Login</Link>
       
      </nav>
    </div>
  );
}

export default Home;

import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

  // Check login status from localStorage
  const isLoggedIn = !!localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  if (!isLoggedIn) {
    // Return null to hide the navbar if the user is not logged in
    return null;
  }

  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">Blogging App</h1>
    <div className="space-x-4">
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Logout</Link>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  </nav>
};

export default Navbar;

import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Sidebar = () => {
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

  return (
    <aside className="w-64 bg-gray-200 p-4 hidden lg:block">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/posts"
            className="block text-blue-600 hover:text-blue-800 font-medium"
          >
            📃 All Posts
          </Link>
        </li>
        <li>
          <Link
            to="/post"
            className="block text-blue-600 hover:text-blue-800 font-medium"
          >
            ✏️ Create Post
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="block text-blue-600 hover:text-blue-800 font-medium"
          >
            👤 Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

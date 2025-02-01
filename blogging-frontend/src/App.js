import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogPost from './pages/BlogPost';
import PostList from './pages/PostList';
import Profile from './pages/Profile';
import HealthCheck from './pages/HealthCheck';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <ToastContainer />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-grow bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/post/:id" element={<BlogPost />} />
              <Route path="/post" element={<BlogPost />} />
              <Route path="/profile" element={<Profile />} />
              
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

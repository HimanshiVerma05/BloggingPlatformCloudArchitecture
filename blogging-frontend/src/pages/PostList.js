import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../services/postService';

function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('username');
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [navigate]);

  const handleCreatePost = () => {
    navigate('/post'); // Redirect to the post creation form
  };

  return (
    <div className="container mx-auto max-w-4xl bg-white shadow p-8 rounded">
      <h2 className="text-2xl mb-4">Blog Posts</h2>
      <div className="mb-4">
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create New Post
        </button>
      </div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p>{post.content.slice(0, 100)}...</p>
            <button
              onClick={() => navigate(`/post/${post.id}`)}
              className="text-blue-500 hover:underline mt-2"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;

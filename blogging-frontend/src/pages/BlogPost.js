import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost, deletePost, createPost } from '../services/postService';
import { toast } from 'react-toastify';

function BlogPost() {
  const { id } = useParams(); // Retrieve post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });
  const [editing, setEditing] = useState(false);

  // Fetch post if ID exists
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const data = await getPost(id);
          setPost(data);
        } catch (error) {
          toast.error('Error fetching post details.');
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePost(id, post);
        toast.success('Post updated successfully!');
      } else {
        await createPost(post, 'user@example.com', localStorage.getItem('username'));
        toast.success('Post created successfully!');
      }
      navigate('/posts');
    } catch (error) {
      toast.error('Error saving post. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      toast.success('Post deleted successfully!');
      navigate('/posts');
    } catch (error) {
      toast.error('Error deleting post.');
    }
  };

  return (
    <div className="container mx-auto max-w-2xl bg-white shadow p-8 rounded">
      {editing || !id ? (
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label>Title:</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label>Content:</label>
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              required
              className="border p-2 w-full rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">{post.title}</h2>
          <p>{post.content}</p>
          <div className="flex space-x-2 mt-4">
            <button onClick={() => setEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPost;

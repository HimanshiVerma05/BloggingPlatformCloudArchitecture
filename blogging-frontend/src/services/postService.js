import axios from 'axios';
import config from '../config'; 

const REACT_APP_API_GATEWAY_URL = config.REACT_APP_API_GATEWAY_URL;

const api = axios.create({
  baseURL: config.REACT_APP_API_URL,
});

export const getPosts = async () => {
  try {
    const response = await api.get(`/api/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post details:', error);
    throw error;
  }
};

export const createPost = async (post, userEmail, username) => {
  try {
    const userId = await getUserIdByUsername(username);
    const response = await api.post(`/api/posts`, { ...post, user_id: userId });
    if (response.status === 201) {
      try {
        await axios.post(REACT_APP_API_GATEWAY_URL, {
          message: `New post created: ${post.title}`,
          user_email: userEmail,
        });
      } catch (notificationError) {
        console.error('Error triggering notification:', notificationError);
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await api.put(`/api/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const getUserIdByUsername = async (username) => {
  try {
    const response = await api.get(`/api/auth/user/${username}`);
    return response.data.id;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    throw error;
  }
};

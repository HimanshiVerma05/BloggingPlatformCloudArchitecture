import axios from 'axios';
import config from '../config'; 

const api = axios.create({
  baseURL: config.REACT_APP_API_URL,
});

// Log the base URL being set
console.log('Axios default baseURL:', api.defaults.baseURL);

export const register = async (user) => {
  try {
    console.log('process.env.API_URL --- ',config.REACT_APP_API_URL)
    console.log('inside register');
    const response = await api.post(`/api/auth/register`, user);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const login = async (user) => {
  try {
    console.log('process.env.API_URL --- ',config.REACT_APP_API_URL)
    console.log('process.env.REACT_APP_API_GATEWAY_URL --- ',config.REACT_APP_API_GATEWAY_URL)
    const response = await api.post(`/api/auth/login`, user);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

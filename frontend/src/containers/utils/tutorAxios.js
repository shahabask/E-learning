
export const tutorUrl='http://localhost:5000/api/tutor'
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/tutor', // Replace with your API URL
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true, // If needed for cross-origin requests
    },
  });
  
  // Apply the authcheck middleware to the Axios instance
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('tutorToken');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  export {axiosInstance};
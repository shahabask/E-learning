import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://www.skillsync.website/api/admin', // Replace with your API URL
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true, // If needed for cross-origin requests
    },
  });
  
  // Apply the authcheck middleware to the Axios instance
  axiosInstance.interceptors.request.use(
    async (config) => {
      const admin = JSON.parse(localStorage.getItem('adminInfo'));
    
      const token=admin.token
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
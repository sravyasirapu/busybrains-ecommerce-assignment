import axios from 'axios';

// This is the URL of your Spring Boot Backend
const API_URL = "http://localhost:8080/api/auth/";

// 1. Register Logic
const register = (username, email, password, role) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
    role,
  });
};

// 2. Login Logic
const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

// 3. Logout Logic
const logout = () => {
  localStorage.removeItem("user");
};

// 4. Get Current User Logic
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
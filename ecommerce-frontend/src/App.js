import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        {/* This is where our pages will be displayed */}
        <Routes>
          {/* Default path redirects to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Login Page Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* We will add Dashboard and Register routes here in the next steps */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
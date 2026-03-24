import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Swal from 'sweetalert2';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Hardcoded ROLE_USER for security
      await authService.register(username, email, password, "ROLE_USER");
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Account created as General User.',
        confirmButtonColor: '#002e5b'
      });
      
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Username might be taken!',
        confirmButtonColor: '#002e5b'
      });
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <p style={{ color: '#666' }}>Join BusyBrains Store</p>
      
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Fixed: Using setEmail now
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        

        <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
          Register Now
        </button>
      </form>
      
      <div style={{ marginTop: '20px' }}>
        <span style={{ fontSize: '14px' }}>Already have an account? </span>
        <Link to="/login" style={{ color: '#002e5b', fontWeight: 'bold', textDecoration: 'none' }}>
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
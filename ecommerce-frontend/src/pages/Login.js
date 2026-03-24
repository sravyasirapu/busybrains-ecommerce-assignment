import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      
      // We removed the 'timer' so the user can actually read it
      // The code inside .then() runs ONLY after the user clicks "OK"
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back to BusyBrains Store',
        confirmButtonColor: '#002e5b',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
          window.location.reload(); 
        }
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid Username or Password!',
        confirmButtonColor: '#002e5b'
      });
    }
  };
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const username = params.get("username");
  const role = params.get("role");

  if (token) {
    // Save the Google user data to localStorage
    localStorage.setItem("user", JSON.stringify({ token, username, role }));
    
    Swal.fire({
      icon: 'success',
      title: 'Google Login Successful!',
      timer: 2500,
      showConfirmButton: false
    });

    navigate("/dashboard");
    window.location.reload();
  }
}, [navigate]);

const handleGoogleLogin = () => {
  // Use window.location.href for a full page redirect to the backend
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

  return (
    <div className="auth-card">
      <h2>BusyBrains Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Login</button>
      </form>

      <div className="divider">OR</div>

      <button onClick={handleGoogleLogin} className="btn-google">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
        Continue with Google
      </button>

      <div style={{ marginTop: '20px' }}>
        <span style={{ fontSize: '14px' }}>Don't have an account? </span>
        <Link to="/register" style={{ color: '#002e5b', fontWeight: 'bold', textDecoration: 'none' }}>
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default Login;
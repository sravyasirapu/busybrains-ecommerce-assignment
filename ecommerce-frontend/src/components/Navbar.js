import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav style={{ 
      backgroundColor: '#002e5b', 
      padding: '15px 50px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {/* Brand Name on the Left */}
      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '22px', fontWeight: 'bold' }}>
        BusyBrains <span style={{ color: '#ffc107' }}>Store</span>
      </Link>

      {/* Navigation Links and User Info on the Right */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>Home</Link>
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>My Profile</Link>
        
        {user && (
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '14px', opacity: 0.9 }}>
              Welcome, <strong>{user.username.split('@')[0]}</strong> 
            </span>
            <button 
              onClick={handleLogout} 
              style={{ 
                backgroundColor: 'transparent', 
                border: '1px solid white', 
                color: 'white', 
                padding: '6px 15px', 
                borderRadius: '4px', 
                cursor: 'pointer',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
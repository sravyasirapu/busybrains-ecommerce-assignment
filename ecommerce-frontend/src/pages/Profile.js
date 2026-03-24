import React, { useEffect, useState } from 'react';
import authService from '../services/authService';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleEditProfile = () => {
    Swal.fire({
      title: 'Update Profile',
      input: 'email',
      inputLabel: 'New Email Address',
      inputValue: user.email || '',
      showCancelButton: true,
      confirmButtonColor: '#002e5b'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedData = { ...user, email: result.value };
          await axios.put("http://localhost:8080/api/users/profile", updatedData, {
            headers: { Authorization: 'Bearer ' + user.token }
          });
          const newUser = { ...user, email: result.value };
          localStorage.setItem("user", JSON.stringify(newUser));
          setUser(newUser);
          Swal.fire('Success', 'Profile updated!', 'success');
        } catch (err) {
          Swal.fire('Error', 'Update failed', 'error');
        }
      }
    });
  };

  if (!user) return null;

  return (
    <div>
      <Navbar user={user} />
      <div className="auth-card" style={{ maxWidth: '500px', textAlign: 'left' }}>
        <h2 style={{ textAlign: 'center' }}>My Account</h2>
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <p><strong>Username:</strong> <span style={{ color: '#555' }}>{user.username}</span></p>
          <p><strong>Email:</strong> <span style={{ color: '#555' }}>{user.email || 'Not provided'}</span></p>
          <p><strong>Account Type:</strong> 
            <span style={{ marginLeft: '10px', padding: '4px 10px', backgroundColor: '#002e5b', color: 'white', borderRadius: '20px', fontSize: '12px' }}>
              {user.role === 'ROLE_ADMIN' ? 'Administrator' : 'General User'}
            </span>
          </p>
          <p><strong>Status:</strong> <span style={{ color: 'green' }}>● Active</span></p>
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button className="btn-primary" onClick={handleEditProfile}>Edit Profile</button>
          <button className="btn-primary" style={{ backgroundColor: '#6c757d' }} onClick={() => window.location.href='/dashboard'}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
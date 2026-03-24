import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#002e5b', 
      color: 'white', 
      padding: '20px 20px', 
      marginTop: 'auto', // Pushes footer to bottom
      textAlign: 'center',
      borderTop: '4px solid #ffc107' // Matches the yellow 'Store' text
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>BusyBrains <span style={{ color: '#ffc107' }}>Store</span></h3>
        <p style={{ fontSize: '14px', opacity: 0.8, maxWidth: '600px', margin: '0 auto 20px auto' }}>
          A high-performance e-commerce solution built with React and Spring Boot. 
          Experience seamless shopping with secure JWT and Google SSO integration.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '20px', fontSize: '14px' }}>
          <span style={{ cursor: 'pointer', opacity: 0.9 }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer', opacity: 0.9 }}>Terms of Service</span>
          <span style={{ cursor: 'pointer', opacity: 0.9 }}>Contact Support</span>
        </div>

        <hr style={{ border: '0', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }} />
        
        <p style={{ fontSize: '12px', opacity: 0.6 }}>
          &copy; {new Date().getFullYear()} Developed by Sirapu Sravya. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
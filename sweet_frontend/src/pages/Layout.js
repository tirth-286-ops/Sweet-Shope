import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Assuming username is stored in localStorage after login
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 🔺 Navbar */}
      <nav
        style={{
          backgroundColor: '#f08a5d',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left Side: Shop Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="/logo192.png"
        alt="MithaiMagic Logo"
        style={{ height: '40px', width: '40px', borderRadius: '50%' }}
      />
      <span
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '20px',
        }}
      >
        MithaiMagic Shop
      </span>
    </div>

        {/* Right Side: Links + Username + Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/home"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Home
          </Link>
          <Link
            to="/sweets"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Sweets
          </Link>

       

          <button
            onClick={handleLogout}
            style={{
              background: '#fff',
              color: '#f08a5d',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </nav>
         

      {/* 🔹 Page Content */}
      <main style={{ flex: 1, padding: '2rem', position: 'relative' }}>
  {/* Username on top right of page content */}
  {username && (
    <div
      style={{
        position: 'absolute',
        top: '1rem',
        right: '2rem',
        color: '#ff4081',
        fontWeight: 'bold',
        fontSize: '18px',
      }}
    >
      Hello, {username} 👋
    </div>
  )}

  {children}
</main>

      {/* 🔻 Footer */}
      <footer
        style={{
          backgroundColor: '#222',
          color: '#fff',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <p>📞 +91 63539 35670 | 📧 tirthmehta2004@gmail.com</p>
        <p>&copy; 2025 MithaiMagic Shop | Made with ❤️ by Tirth Mehta</p>
        <div style={{ marginTop: '0.5rem' }}>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '1rem', color: '#fff' }}
          >
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff' }}
          >
            <i className="fab fa-instagram fa-lg"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

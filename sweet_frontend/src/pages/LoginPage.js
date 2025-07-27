import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setPopupMessage('❗ All fields are required');
      setTimeout(() => setPopupMessage(''), 2000);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        setPopupMessage('✅ Login Successful!');

        setTimeout(() => {
          setPopupMessage('');
          navigate('/home');
        }, 1000);
      } else {
        setPopupMessage(data.error || '❌ Login Failed!');
        setTimeout(() => setPopupMessage(''), 2000);
      }
    } catch (error) {
      setPopupMessage('❌ Server error!');
      setTimeout(() => setPopupMessage(''), 2000);
    }
  };

  return (
    <div className="login-container">
      {/* Popup message outside the login box */}
      {popupMessage && (
        <div
          className="popup-message"
          style={{
            backgroundColor: popupMessage.includes('✅') ? '#d4edda' : '#f8d7da',
            color: popupMessage.includes('✅') ? '#155724' : '#721c24',
          }}
        >
          {popupMessage}
        </div>
      )}

      <div className="login-box">
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />

        <button onClick={handleLogin} className="login-button">
          Login
        </button>

        <p style={{ marginTop: '1rem' }}>
          Don't have an account?{' '}
          <Link to="/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage('❗ All fields are required');
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
        // Store token and username
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username); // ✅ Store username
        setMessage('✅ Login Successful!');
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setMessage(data.error || '❌ Login Failed!');
      }
    } catch (error) {
      setMessage('❌ Server error!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

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

        {message && (
          <p
            className="login-message"
            style={{ color: message.includes('✅') ? 'green' : 'red' }}
          >
            {message}
          </p>
        )}

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{
              color: '#f2855d',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

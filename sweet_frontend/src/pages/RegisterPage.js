import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setPopupMessage('✅ Registration Successful! Redirecting to login...');
        setUsername('');
        setEmail('');
        setPassword('');
        setErrors({});
        setTimeout(() => {
          setPopupMessage('');
          navigate('/login');
        }, 2000);
      } else {
        setPopupMessage(data.error || '❌ Registration Failed!');
        setTimeout(() => setPopupMessage(''), 2000);
      }
    } catch {
      setPopupMessage('❌ Server Error');
      setTimeout(() => setPopupMessage(''), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      {/* Popup message */}
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

      <div className="register-box">
        <h2 className="register-heading">Sign Up</h2>

        <input
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {errors.username && <span className="register-error">{errors.username}</span>}

        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <span className="register-error">{errors.email}</span>}

        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors.password && <span className="register-error">{errors.password}</span>}

        <button className="register-button" onClick={handleRegister} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="register-login-text">
          Already have an account?{' '}
          <Link to="/login" className="register-login-link">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css'; // Optional: your styles

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to MithaiMagic</h1>
      <p>Welcome! Please login or sign up to continue.</p>
      <div className="landing-buttons">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ⬅️ Added Link

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
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
        setMessage('✅ Registration Successful! Redirecting to login...');
        setUsername('');
        setEmail('');
        setPassword('');
        setErrors({});

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(data.error || '❌ Registration Failed!');
      }
    } catch (error) {
      setMessage('❌ Server Error');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign Up</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {errors.username && <span style={styles.error}>{errors.username}</span>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors.password && <span style={styles.error}>{errors.password}</span>}

        <button style={styles.button} onClick={handleRegister} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        {message && <p style={styles.message}>{message}</p>}

        {/* 🔗 Link to Login */}
        <p style={styles.loginText}>
          Already have an account? <Link to="/login" style={styles.loginLink}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fdf1f2',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '300px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '1.8rem',
    color: '#f08a5d',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f08a5d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.85rem',
    textAlign: 'left',
    display: 'block',
    marginBottom: '8px',
  },
  message: {
    marginTop: '15px',
    fontSize: '1rem',
    color: '#155724',
  },
  loginText: {
    marginTop: '20px',
    fontSize: '0.95rem',
  },
  loginLink: {
    color: '#f08a5d',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default RegisterPage;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SweetsPage from './pages/SweetsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import Landing from './pages/Landing';
import './App.css';

// ✅ Protected route wrapper
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// ✅ Home page with username and slideshow
function HomePage({ sweetImages, currentSlide }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <div className="home-container">
       <center>
        <h1>Welcome to the MithaiMagic Shop</h1>
        <p>Enjoy our delightful sweets collection! Freshly made with love and tradition.</p>
      </center>
      <div className="slideshow-container">
        <center>
          <img
            src={sweetImages[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="slideshow-image"
          />
        </center>
      </div>

      <section className="category-section">
  <center><h2>Sweet Categories</h2></center>
  <table className="category-table">
    <thead>
      <tr>
        <th>Category</th>
        <th>Description</th>
        <th>Popular Items</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Traditional Mithai</td>
        <td>Classic Indian sweets made for every occasion</td>
        <td>Ladoo, Barfi, Halwa</td>
      </tr>
      <tr>
        <td>Milk Based</td>
        <td>Creamy, rich sweets made with milk and khoya</td>
        <td>Rasmalai, Rasgulla, Kalakand</td>
      </tr>
      <tr>
        <td>Dry Fruit Special</td>
        <td>Healthy and delicious sweets loaded with nuts</td>
        <td>Kaju Katli, Dry Fruit Roll</td>
      </tr>
      <tr>
        <td>Chocolate Sweets</td>
        <td>Fusion of rich chocolate with traditional Indian flavors</td>
        <td>Chocolate Barfi, Choco Ladoo, Chocolate Peda</td>
      </tr>
      <tr>
        <td>Bengali Sweets</td>
        <td>Authentic sweets from Bengal, soaked in syrup and love</td>
        <td>Sandesh, Mishti Doi, Chomchom</td>
      </tr>
    </tbody>
  </table>
</section>

    </div>
  );
}

// ✅ Main App Component
function App() {
  const sweetImages = [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg',
    '/images/img4.webp',
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sweetImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sweetImages.length]);

  return (
    <Router>
      <Routes>
        {/* ✅ Landing page */}
        <Route path="/" element={<Landing />} />

        {/* ✅ Auth routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ Home route - Protected */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage sweetImages={sweetImages} currentSlide={currentSlide} />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ✅ Sweets route - Protected */}
        <Route
          path="/sweets"
          element={
            <ProtectedRoute>
              <Layout>
                <SweetsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

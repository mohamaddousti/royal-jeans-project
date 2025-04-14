import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProductGenerator from './components/ProductGenerator';
import ProductList from './components/ProductList';
import AdminPanel from './components/Admin';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  console.log('App.js is rendering, token:', token);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login setToken={setToken} /> : <Navigate to="/generate" />}
        />
        <Route
          path="/generate"
          element={token ? <ProductGenerator token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={token ? <ProductList token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={token ? <AdminPanel token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={token ? <Profile token={token} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
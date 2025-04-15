import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Login from './components/Login';
import ProductGenerator from './components/ProductGenerator';
import ProductList from './components/ProductList';
import Admin from './components/Admin';
import Profile from './components/Profile';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar collapsed={collapsed} rtl={true} className="bg-gray-800 text-white">
          <Menu iconShape="square">
            <MenuItem component={<Link to="/generate" />}>تولید محصول</MenuItem>
            <MenuItem component={<Link to="/products" />}>لیست محصولات</MenuItem>
            <MenuItem component={<Link to="/admin" />}>ادمین</MenuItem>
            <MenuItem component={<Link to="/profile" />}>پروفایل</MenuItem>
          </Menu>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <AppBar position="static" className="bg-blue-600">
            <Toolbar>
              <Typography variant="h6">پنل مدیریت</Typography>
            </Toolbar>
          </AppBar>
          <div className="p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/generate" element={<ProductGenerator />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;
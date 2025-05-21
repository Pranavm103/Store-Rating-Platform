import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

const App = () => {
  return (
    <div>
      <h1>Welcome to the Store Rating Platform</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> | <Link to="/admin">Admin Dashboard</Link> | <Link to="/user">User Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '', role: 'user' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', form);
      navigate('/login');
    } catch {
      setError('Signup failed. Check input.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input name="name" placeholder="Full Name" pattern=".{20,60}" title="20-60 chars" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="address" placeholder="Address" maxLength="400" onChange={handleChange} required />
        <input name="password" type="password" pattern="(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}" title="8-16 chars with uppercase & special char" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
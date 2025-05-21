import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout } from '../utils/logout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const fetchStats = async () => {
      const res = await axios.get('/api/admin/stats', headers);
      setStats(res.data);
    };

    const fetchUsers = async () => {
      const res = await axios.get('/api/admin/users', headers);
      setUsers(res.data);
    };

    fetchStats();
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <p>Total Users: {stats.total_users}</p>
      <p>Total Stores: {stats.total_stores}</p>
      <p>Total Ratings: {stats.total_ratings}</p>

      <h3>User List</h3>
      <table border="1">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Address</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td><td>{user.email}</td><td>{user.address}</td><td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
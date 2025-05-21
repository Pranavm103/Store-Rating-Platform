import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout } from '../utils/logout';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchStores = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/stores', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStores(res.data);
    };
    fetchStores();
  }, []);

  const rateStore = async (store_id, rating) => {
    const token = localStorage.getItem('token');
    await axios.post('/api/ratings', { store_id, rating }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRatings(prev => ({ ...prev, [store_id]: rating }));
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={logout}>Logout</button>
      {stores.map(store => (
        <div key={store.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h4>{store.name}</h4>
          <p>{store.address}</p>
          <select value={ratings[store.id] || ''} onChange={(e) => rateStore(store.id, Number(e.target.value))}>
            <option value="">Rate</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
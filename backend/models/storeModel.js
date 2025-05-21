const pool = require('./db');

const createStore = async ({ name, email, address }) => {
  const res = await pool.query(
    'INSERT INTO stores (name, email, address) VALUES ($1, $2, $3) RETURNING *',
    [name, email, address]
  );
  return res.rows[0];
};

const getAllStores = async () => {
  const res = await pool.query('SELECT * FROM stores');
  return res.rows;
};

module.exports = { createStore, getAllStores };

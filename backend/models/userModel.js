const pool = require('./db');

const createUser = async ({ name, email, password, address, role }) => {
  const res = await pool.query(
    'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, password, address, role]
  );
  return res.rows[0];
};

const getUserByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

const getAllUsers = async () => {
  const res = await pool.query('SELECT id, name, email, address, role FROM users');
  return res.rows;
};

module.exports = { createUser, getUserByEmail, getAllUsers };

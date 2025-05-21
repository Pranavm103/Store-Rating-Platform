const pool = require('./db');

const submitRating = async ({ user_id, store_id, rating }) => {
  const res = await pool.query(
    'INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3) ON CONFLICT (user_id, store_id) DO UPDATE SET rating = $3 RETURNING *',
    [user_id, store_id, rating]
  );
  return res.rows[0];
};

const getRatingsForStore = async (store_id) => {
  const res = await pool.query(
    'SELECT rating FROM ratings WHERE store_id = $1',
    [store_id]
  );
  return res.rows;
};

module.exports = { submitRating, getRatingsForStore };

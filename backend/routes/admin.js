const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { createStore } = require('../models/storeModel');
const { createUser, getAllUsers } = require('../models/userModel');
const pool = require('../models/db');

router.use(authenticateToken);
router.use(authorizeRoles('admin'));

router.post('/add-store', async (req, res) => {
  const { name, email, address } = req.body;
  const store = await createStore({ name, email, address });
  res.status(201).json(store);
});

router.post('/add-user', async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password: hashedPassword, address, role });
  res.status(201).json(user);
});

router.get('/users', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

router.get('/stats', async (req, res) => {
  const users = await pool.query('SELECT COUNT(*) FROM users');
  const stores = await pool.query('SELECT COUNT(*) FROM stores');
  const ratings = await pool.query('SELECT COUNT(*) FROM ratings');
  res.json({ total_users: users.rows[0].count, total_stores: stores.rows[0].count, total_ratings: ratings.rows[0].count });
});

module.exports = router;

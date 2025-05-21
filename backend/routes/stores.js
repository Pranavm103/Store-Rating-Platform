const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { getAllStores } = require('../models/storeModel');

router.get('/', authenticateToken, async (req, res) => {
  const stores = await getAllStores();
  res.json(stores);
});

module.exports = router;

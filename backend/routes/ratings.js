const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { submitRating } = require('../models/ratingModel');

router.post('/', authenticateToken, async (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;
  const result = await submitRating({ user_id, store_id, rating });
  res.status(201).json(result);
});

module.exports = router;

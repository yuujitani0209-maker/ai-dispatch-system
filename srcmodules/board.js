const express = require('express');
const router = express.Router();

// In-memory board items store
let boardItems = [];

// GET all board items
router.get('/', (req, res) => {
  res.json(boardItems);
});

// POST to add or update a board item
router.post('/', (req, res) => {
  const item = req.body;
  if (!item || !item.id) {
    return res.status(400).json({ error: 'Invalid item' });
  }
  const index = boardItems.findIndex(i => i.id === item.id);
  if (index !== -1) {
    boardItems[index] = item;
  } else {
    boardItems.push(item);
  }
  res.json(item);
});

module.exports = router;

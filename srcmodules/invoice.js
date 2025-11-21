const express = require('express');
const router = express.Router();

// GET base route - returns status
router.get('/', (req, res) => {
  res.json({ status: 'invoice module' });
});

// POST create invoice
router.post('/create', (req, res) => {
  // placeholder for invoice creation logic
  res.json({ message: 'create invoice', payload: req.body });
});

module.exports = router;

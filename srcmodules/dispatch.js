const express = require('express');
const router = express.Router();

// Example endpoint to check status
router.get('/', async (req, res) => {
  res.json({ status: 'dispatch ok' });
});

// Example endpoint to create dispatch
router.post('/create', async (req, res) => {
  const payload = req.body;
  // TODO: implement logic
  res.json({ message: 'dispatch created', payload });
});

module.exports = router;

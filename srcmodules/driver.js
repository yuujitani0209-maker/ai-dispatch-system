const express = require('express');
const router = express.Router();

// Example endpoint to check status
router.get('/', async (req, res) => {
  res.json({ status: 'driver ok' });
});

// Example endpoint to create driver
router.post('/create', async (req, res) => {
  const payload = req.body;
  // TODO: implement driver creation logic
  res.json({ message: 'driver created', payload });
});

module.exports = router;

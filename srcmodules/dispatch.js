const express = require('express');
const router = express.Router();

// In-memory dispatches array for MVP demonstration
const dispatches = [];

// GET / - status
router.get('/', (req, res) => {
  res.json({ status: 'dispatch module ok' });
});

// GET /list - return all dispatches
router.get('/list', (req, res) => {
  res.json({ dispatches });
});

// POST /create - create new dispatch
router.post('/create', (req, res) => {
  const payload = req.body;
  const id = dispatches.length + 1;
  const dispatch = { id, ...payload };
  dispatches.push(dispatch);
  res.json({ message: 'dispatch created', dispatch });
});

module.exports = router;

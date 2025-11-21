const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET base route - returns status
router.get('/', (req, res) => {
  res.json({ status: 'invoice module' });
});

// List all invoices
router.get('/list', async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany();
    res.json({ invoices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Create invoice
router.post('/create', async (req, res) => {
  try {
    const { dispatchId, amount, status } = req.body;
    const invoice = await prisma.invoice.create({
      data: { dispatchId, amount, status },
    });
    res.json({ message: 'invoice created', invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

module.exports = router;

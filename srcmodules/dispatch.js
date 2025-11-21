const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET / - status
router.get('/', (req, res) => {
  res.json({ status: 'dispatch module' });
});

// GET /list - return all dispatches from DB
router.get('/list', async (req, res) => {
  try {
    const dispatches = await prisma.dispatch.findMany({
      include: {
        driver: true,
      },
    });
    res.json({ dispatches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dispatches' });
  }
});

// POST /create - create new dispatch in DB
router.post('/create', async (req, res) => {
  try {
    const { description, driverId, status } = req.body;
    const dispatch = await prisma.dispatch.create({
      data: {
        description,
        status,
        driver: driverId ? { connect: { id: driverId } } : undefined,
      },
    });
    res.json({ message: 'dispatch created', dispatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create dispatch' });
  }
});

module.exports = router;

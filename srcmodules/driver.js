const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Endpoint to check status
router.get('/', async (req, res) => {
  res.json({ status: 'driver ok' });
});

// Endpoint to list all drivers
router.get('/list', async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany();
    res.json({ drivers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

// Endpoint to create a new driver with optional latitude and longitude
router.post('/create', async (req, res) => {
  try {
    const { name, licenseNumber, lat, lng } = req.body;
    const driver = await prisma.driver.create({
      data: {
        name,
        licenseNumber,
        lat: lat || null,
        lng: lng || null,
      },
    });
    res.json({ message: 'driver created', driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create driver' });
  }
});

module.exports = router;

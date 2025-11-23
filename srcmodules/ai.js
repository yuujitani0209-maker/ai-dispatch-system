const express = require('express');
const router = express.Router();

// AI module status
router.get('/', (req, res) => {
  res.json({ status: 'ai module' });
});

// Enhanced route optimization using simple placeholder.
// In production, replace with algorithm that uses traffic data and optimal ordering.
router.post('/route-optimize', (req, res) => {
  const { stops } = req.body;
  // If stops array exists, just return it as-is with a placeholder message
  res.json({
    message: 'Optimized route calculated (stub)',
    stops: stops || [],
    suggestion: stops || []
  });
});

// Improved labor check that returns remaining allowed driving hours.
// Use simple 8-hour limit; in production adapt to regulations and rest periods.
router.post('/labor-check', (req, res) => {
  const { hoursWorked = 0, breaksTaken = 0 } = req.body;
  const MAX_HOURS = 8;
  const remainingHours = MAX_HOURS - hoursWorked;
  const isOver = remainingHours < 0;
  res.json({
    message: isOver ? 'Warning: excessive hours' : 'Within limit',
    hoursWorked,
    breaksTaken,
    remainingHours: remainingHours < 0 ? 0 : remainingHours
  });
});

// Auto dispatch algorithm (stub).
// Assign each order to a driver in a round-robin manner.
router.post('/auto-dispatch', (req, res) => {
  const { orders = [], drivers = [] } = req.body;
  const assignments = orders.map((order, idx) => {
    if (drivers.length === 0) {
      return { order, driver: null };
    }
    const driver = drivers[idx % drivers.length];
    return { order, driver };
  });
  res.json({ assignments });
});

// Driver recommendation function used by socket events.
// Returns driver with maximum availableTime if provided, otherwise the first driver.
router.getDriverRecommendation = async function(currentState) {
  const drivers = (currentState && currentState.drivers) || [];
  if (!drivers || drivers.length === 0) {
    return null;
  }
  let bestDriver = drivers[0];
  if (drivers[0] && typeof drivers[0] === 'object' && drivers[0].availableTime !== undefined) {
    for (const d of drivers) {
      if (d.availableTime > bestDriver.availableTime) {
        bestDriver = d;
      }
    }
  }
  return bestDriver;
};

module.exports = router;

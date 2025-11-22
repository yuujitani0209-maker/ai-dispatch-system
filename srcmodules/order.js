const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// 状態確認
router.get('/', (req, res) => {
  res.json({ status: 'order module ok' });
});

// 受注（配車）一覧を取得
router.get('/list', async (req, res) => {
  try {
    const orders = await prisma.dispatch.findMany({
      include: { driver: true, cargos: true, invoices: true },
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list orders' });
  }
});

// 受注データをインポートして配車を作成
router.post('/import', async (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ error: 'orders must be an array' });
    }
    const created = [];
    for (const order of orders) {
      const newDispatch = await prisma.dispatch.create({
        data: {
          description: order.description,
          status: order.status || 'pending',
          userId: req.user?.id || 1,
          ...(order.driverId ? { driver: { connect: { id: order.driverId } } } : {}),
        },
      });
      created.push(newDispatch);
    }
    res.json({ created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to import orders' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const subscriptionService = require('../services/subscriptionService');


router.post('/events/order', async (req, res) => {
    const { userId, orderAmount } = req.body;
    // In real world compute aggregated metrics; here accept a simple incremental event
    const metrics = { orders: 1, monthVolume: orderAmount || 0 };
    const s = await subscriptionService.evaluateAndApplyTier({ userId, metrics });
    if (!s) return res.status(404).json({ error: 'no active subscription' });
    res.json(s);
});


module.exports = router;
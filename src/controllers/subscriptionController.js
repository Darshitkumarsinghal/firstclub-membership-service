const express = require('express');
const router = express.Router();
const subscriptionService = require('../services/subscriptionService');


router.get('/plans', async (req, res) => {
const plans = await subscriptionService.getPlans();
res.json(plans);
});


router.post('/subscriptions', async (req, res) => {
try {
   const { userId, planId, tierId } = req.body;
   const s = await subscriptionService.subscribe({ userId, planId, tierId });
   res.json(s);
} catch (e) {
    res.status(400).json({ error: e.message });
}
});


router.get('/subscriptions/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const s = await subscriptionService.getActiveSubscriptionById(id);
    if (!s) return res.status(404).json({ error: 'not found or inactive' });
    res.json(s);
});


router.post('/subscriptions/:id/upgrade', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const target = req.query.target;
    const s = await subscriptionService.upgradeTier(id, target);
    if (!s) return res.status(400).json({ error: 'cannot upgrade' });
    res.json(s);
});


router.post('/subscriptions/:id/downgrade', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const target = req.query.target;
    const s = await subscriptionService.downgradeTier(id, target);
    if (!s) return res.status(400).json({ error: 'cannot downgrade' });
    res.json(s);
});


router.post('/subscriptions/:id/cancel', async (req, res) => {
   const id = parseInt(req.params.id, 10);
   const ok = await subscriptionService.cancel(id);
    if (!ok) return res.status(400).json({ error: 'cannot cancel' });
    res.json({ status: 'cancelled' });
});


module.exports = router;
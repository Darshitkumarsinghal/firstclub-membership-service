const { Subscription } = require('../models');
const { MembershipPlan, Tier } = require('../constants');
const RuleEngine = require('./ruleEngine');
const { Mutex } = require('async-mutex');



// per-user mutex to avoid race conditions on subscription changes
const locks = new Map();
function getLock(userId) {
if (!locks.has(userId)) locks.set(userId, new Mutex());
return locks.get(userId);
}


class SubscriptionService {
constructor() {
this.ruleEngine = new RuleEngine();
}


async getPlans() {
return Object.values(MembershipPlan).map(p => ({ id: p.id, price: p.price, durationMonths: p.months }));
}


async subscribe({ userId, planId, tierId }) {
const plan = MembershipPlan[planId];
if (!plan) throw new Error('plan not found');
const now = new Date();
const expires = new Date(now);
expires.setMonth(expires.getMonth() + plan.months);


const mutex = getLock(userId);
return await mutex.runExclusive(async () => {
// deactivate existing
await Subscription.update({ active: false }, { where: { userId, active: true } });
const sub = await Subscription.create({ userId, planId: plan.id, tierId: tierId || Tier.SILVER.id, startAt: now, expiresAt: expires, active: true });
return sub.toJSON();
});
}

async getActiveSubscriptionById(id) {
const sub = await Subscription.findByPk(id);
if (!sub || !sub.active) return null;
return sub.toJSON();
}


async upgradeTier(subscriptionId, targetTierId) {
const sub = await Subscription.findByPk(subscriptionId);
if (!sub || !sub.active) return null;
const currentLevel = Tier[sub.tierId].level;
const targetLevel = Tier[targetTierId].level;
if (targetLevel <= currentLevel) return sub.toJSON();
sub.tierId = targetTierId;
await sub.save();
return sub.toJSON();
}


async downgradeTier(subscriptionId, targetTierId) {
const sub = await Subscription.findByPk(subscriptionId);
if (!sub || !sub.active) return null;
const currentLevel = Tier[sub.tierId].level;
const targetLevel = Tier[targetTierId].level;
if (targetLevel >= currentLevel) return sub.toJSON();
sub.tierId = targetTierId;
await sub.save();
return sub.toJSON();
}


async cancel(subscriptionId) {
const sub = await Subscription.findByPk(subscriptionId);
if (!sub || !sub.active) return false;
sub.active = false;
await sub.save();
return true;
}


async evaluateAndApplyTier({ userId, metrics }) {
const mutex = getLock(userId);
return await mutex.runExclusive(async () => {
const sub = await Subscription.findOne({ where: { userId, active: true } });
if (!sub) return null;
const newTierId = this.ruleEngine.evaluatePromotion(sub.tierId, metrics);
if (newTierId !== sub.tierId) {
sub.tierId = newTierId;
await sub.save();
}
return sub.toJSON();
});
}
}

module.exports = new SubscriptionService();
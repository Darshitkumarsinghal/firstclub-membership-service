/**
* Simple RuleEngine: thresholds are configurable here. In production use DB driven rules.
*/
const { Tier } = require('../constants');


class RuleEngine {
constructor(cfg = {}) {
// defaults
this.cfg = Object.assign({
goldOrderCount: 3,
goldMonthlyVolume: 1000.0,
platinumOrderCount: 8,
platinumMonthlyVolume: 5000.0
}, cfg);
}


evaluatePromotion(currentTierId, metrics = {}) {
const orders = metrics.orders || 0;
const monthVolume = metrics.monthVolume || 0.0;


if (orders >= this.cfg.platinumOrderCount || monthVolume >= this.cfg.platinumMonthlyVolume) return Tier.PLATINUM.id;
if (orders >= this.cfg.goldOrderCount || monthVolume >= this.cfg.goldMonthlyVolume) return Tier.GOLD.id;
if (orders > 0) return Tier.SILVER.id;
return Tier.NONE.id;
}
}


module.exports = RuleEngine;
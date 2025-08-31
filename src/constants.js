const MembershipPlan = {
MONTHLY: { id: 'MONTHLY', price: 299, months: 1 },
QUARTERLY: { id: 'QUARTERLY', price: 799, months: 3 },
YEARLY: { id: 'YEARLY', price: 2499, months: 12 }
};


const Tier = {
NONE: { id: 'NONE', level: 0 },
SILVER: { id: 'SILVER', level: 1 },
GOLD: { id: 'GOLD', level: 2 },
PLATINUM: { id: 'PLATINUM', level: 3 }
};


module.exports = { MembershipPlan, Tier };
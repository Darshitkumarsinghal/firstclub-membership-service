module.exports = (sequelize, DataTypes) => {
const Subscription = sequelize.define('Subscription', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
userId: { type: DataTypes.INTEGER, allowNull: false },
planId: { type: DataTypes.STRING, allowNull: false },
tierId: { type: DataTypes.STRING, allowNull: false },
startAt: { type: DataTypes.DATE, allowNull: false },
expiresAt: { type: DataTypes.DATE, allowNull: false },
active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });
return Subscription;
};
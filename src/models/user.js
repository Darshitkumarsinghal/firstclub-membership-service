module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
   }, 
   { timestamps: true });
    return User;
};
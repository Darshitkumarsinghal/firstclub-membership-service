const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: path.join(__dirname, '..', 'db.sqlite'), logging: false });


const User = require('./user')(sequelize, DataTypes);
const Subscription = require('./subscription')(sequelize, DataTypes);


module.exports = { sequelize, User, Subscription };
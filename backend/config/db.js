const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bidding', 'root', 'nikita123', {
  host: 'localhost',
  dialect: 'mysql', // Specify the dialect for MySQL
});

module.exports = sequelize;
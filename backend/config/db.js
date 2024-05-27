const { Sequelize } = require('sequelize');
const dotenv = require("dotenv")
dotenv.config();

const sequelize = new Sequelize('bidding', process.env.DB_USER_NAME , process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql', // Specify the dialect for MySQL
});

module.exports = sequelize;
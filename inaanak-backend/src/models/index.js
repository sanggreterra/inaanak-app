const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Initialize models (pass sequelize and DataTypes to avoid circular requires)
const Inaanak = require('./inaanak')(sequelize, DataTypes);

// Export an object that contains both sequelize and models
const models = {
  sequelize,
  Inaanak,
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection successful!');
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
  }
})();

module.exports = models;
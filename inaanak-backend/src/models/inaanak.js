const { DataTypes } = require('sequelize');
const sequelize = require('./index');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Inaanak', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pamasko: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'inaanaks',
    timestamps: false,
  });
};

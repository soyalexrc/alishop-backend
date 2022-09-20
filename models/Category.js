
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('category', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
  }
})

module.exports = Category;

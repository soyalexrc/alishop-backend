const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Provider = sequelize.define('provider', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true
  },
  observations: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  photo: {
    type: DataTypes.STRING,
    default: '',
  },
  rut: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
})

module.exports = Provider;

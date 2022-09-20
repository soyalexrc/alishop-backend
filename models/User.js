
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true
  },
  password: DataTypes.STRING,
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  observations: DataTypes.STRING,
  document: DataTypes.STRING,
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  sender: {
    type: DataTypes.STRING,
    default: 'Alice Valenzuela'
  },
  senderRut: {
    type: DataTypes.STRING,
    default: '18.126.735-6'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  rut: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING,
    default: '',
  },
  rol: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false
  }
})

module.exports = User;

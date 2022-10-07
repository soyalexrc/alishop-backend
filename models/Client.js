
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define('client', {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
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
    allowNull: false,
    required: true,
  },
  transport: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Client;

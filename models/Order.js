const {uuid} = require('uuidv4');
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('order', {
  orderId: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING(100),
  },
  statesHistory: {
    type: DataTypes.JSON
  },
  dimensions: DataTypes.STRING(100),
  description: DataTypes.STRING,
  weight: DataTypes.STRING(100),
  amountOfBoxes: DataTypes.INTEGER,
  evidence: {
    type: DataTypes.JSON,
  },
  transactionNumber: {
    type: DataTypes.STRING(100),
  },
  transactionObservation: DataTypes.STRING,
  estimatedDateDelivering: {
    type: DataTypes.DATE
  },
  products: {
    type: DataTypes.JSON,
    required: true
  },
  paymentMethod: DataTypes.STRING(100),
  total: DataTypes.INTEGER,
  sender: {
    type: DataTypes.STRING(100),
    default: 'Alice Valenzuela'
  },
  senderRut: {
    type: DataTypes.STRING(100),
    default: '18.126.735-6'
  },
  deliveryData: {
    type: DataTypes.JSON,
  },
})

module.exports = Order;

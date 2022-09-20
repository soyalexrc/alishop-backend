const {uuid} = require('uuidv4');
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('order', {
  orderId: {
    type: DataTypes.VIRTUAL,
    get() {
      return uuid()
    }
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  statesHistory: {
    type: DataTypes.JSON,
  },
  dimensions: DataTypes.STRING,
  description: DataTypes.STRING,
  weight: DataTypes.STRING,
  amountOfBoxes: DataTypes.INTEGER,
  evidence: {
    type: DataTypes.STRING,
    default: '',
  },
  estimatedDateDelivering: {
    type: DataTypes.DATE,
    required: true,
  }
})

module.exports = Order;

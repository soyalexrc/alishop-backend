
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order')
const Product = require('./Product')

const OrderProducts = sequelize.define('orderProducts', {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order, // 'Movies' would also work
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product, // 'Movies' would also work
      key: 'id'
    }
  }
})

module.exports = OrderProducts;

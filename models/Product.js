const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const slugify = require('slugify');

const Product = sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true
  },
  description: DataTypes.STRING,
  showDetailPrice: {
    type: DataTypes.BOOLEAN,
    default: true
  },
  showMajorPrice: {
    type: DataTypes.BOOLEAN,
    default: true
  },
  showPackingPrice: {
    type: DataTypes.BOOLEAN,
    default: true
  },
  purchasePrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    required: true
  },
  detailPrice: {
    type: DataTypes.JSON,
    allowNull: false,
    required: true
  },
  majorPrice: {
    type: DataTypes.JSON,
    allowNull: false,
    required: true
  },
  packingPrice: {
    type: DataTypes.JSON,
    allowNull: false,
    required: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  images: {
    type: DataTypes.JSON,
    default: '',
  },
  slug: {
    type: DataTypes.VIRTUAL,
    get() {
      const productTitle = this.getDataValue('name');
      return slugify(productTitle, {lower: true})
    }
  }
})

module.exports = Product;

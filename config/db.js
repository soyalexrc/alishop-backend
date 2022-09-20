const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('db_alishop', 'alishop', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  port: 43306,
});


module.exports = sequelize;

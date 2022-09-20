const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('db_alishop', 'alishop', '1234', {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 43306,
// });

const sequelize = new Sequelize('railway', 'root', 'kj5WXZqm7PqKaMmp0jm3', {
  host: 'containers-us-west-52.railway.app',
  dialect: 'mysql',
  port: 7939,
});


module.exports = sequelize;

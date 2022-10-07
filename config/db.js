const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('db_alishop', 'alishop', '1234', {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 43306,
// });

const sequelize = new Sequelize('railway', 'root', 'sZ0qcAdoxyyV7Bk3s9gB', {
  host: 'containers-us-west-56.railway.app',
  dialect: 'mysql',
  port: 7652,
});


module.exports = sequelize;

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const sequelize = require('./config/db');
const colors = require('colors');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Category = require('./models/Category');
const Client = require('./models/Client');
const Provider = require('./models/Provider');
const OrderProducts = require('./models/OrderProducts');

dotenv.config();

// associations
Product.belongsTo(Provider);
Provider.hasMany(Product, {as: 'products'})

Product.belongsTo(Category);
Category.hasMany(Product, {as: 'products'})

Order.belongsTo(Client);
Client.hasMany(Order, { as: 'orders' });

Order.belongsToMany(Product, { through: OrderProducts });
Product.belongsToMany(Order, { through: OrderProducts });


async function main() {
  try {
    // await sequelize.sync({ force: true })
    await sequelize.sync({ alter: true })
      console.log('Connection has ben established successfully'.cyan.underline.bold);
  } catch (e) {
    console.log(e)
  }
}

//Connect to database
main()


//routes
const clients = require('./routes/customers');
const workers = require('./routes/workers');
const orders = require('./routes/orders');
const categories = require('./routes/categories');
const products = require('./routes/products');
const providers = require('./routes/providers');
const auth = require('./routes/auth');

//initialize server
const app = express();

//Body parser
app.use(express.json());

//cors
app.use(cors());

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//mount routes
app.use('/api/v1/clients', clients);
app.use('/api/v1/workers', workers);
app.use('/api/v1/orders', orders);
app.use('/api/v1/categories', categories);
app.use('/api/v1/products', products);
app.use('/api/v1/auth', auth);
app.use('/api/v1/orders', orders);
app.use('/api/v1/providers', providers);


app.use(errorHandler);

// associations



const PORT = process.env.PORT || 5001



const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} node on port ${PORT}`.yellow.bold));

//handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
})

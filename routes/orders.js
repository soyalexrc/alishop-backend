const express = require('express');
const {
  getOrders,
  updateOrder,
  createOrder,
  deleteOrder,
  getOrderById,
} = require('../controllers/orders');

const router = express.Router();

router
  .route('/')
  .post(getOrders)


router.route('/create')
  .post(createOrder)


router
  .route('/:id')
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder)


module.exports = router;

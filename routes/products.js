const express = require('express');
const {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductBySlug
} = require('../controllers/products');

const router = express.Router();

router
  .route('/')
  .post(getProducts)

router.route('/create')
  .post(createProduct);

router
  .route('/:id')
  .put(updateProduct)
  .delete(deleteProduct)

router
  .route('/getBySlug')
  .post(getProductBySlug)


module.exports = router;

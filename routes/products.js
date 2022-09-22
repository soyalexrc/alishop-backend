const express = require('express');
const {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductById,
  getProductsByCategory
} = require('../controllers/products');

const router = express.Router();

router
  .route('/')
  .post(getProducts)

router.route('/create')
  .post(createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct)

router
  .route('/getByCategory')
  .post(getProductsByCategory)


module.exports = router;

const express = require('express');
const {
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
  getCategoryById,
} = require('../controllers/categories');

const router = express.Router();

router
  .route('/')
  .post(getCategories)

router.route('/create')
  .post(createCategory);

router
  .route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory)


module.exports = router;

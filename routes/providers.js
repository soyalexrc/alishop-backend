const express = require('express');
const {
  getProviderById,
  createProvider,
  getProviders,
  deleteProvider,
  updateProvider
} = require('../controllers/providers');

const router = express.Router();

router
  .route('/')
  .post(getProviders)

router.route('/create')
  .post(createProvider);

router.route('/getById')
  .post(getProviderById);


router
  .route('/:id')
  .get(getProviderById)
  .put(updateProvider)
  .delete(deleteProvider)


module.exports = router;

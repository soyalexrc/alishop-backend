const express = require('express');
const {
  getClientById,
  createClient,
  getClients,
  deleteClient,
  updateClient
} = require('../controllers/clients');

const router = express.Router();

router
  .route('/')
  .post(getClients)

router.route('/create')
  .post(createClient);

router.route('/getById')
  .post(getClientById);


router
  .route('/:id')
  .get(getClientById)
  .put(updateClient)
  .delete(deleteClient)


module.exports = router;

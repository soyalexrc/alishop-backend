const express = require('express');
const {
  getWorkerById,
  createWorker,
  getWorkers,
  deleteWorker,
  updateWorker,
  getWorkersByState,
  sendEmailCreationToWorker,
} = require('../controllers/workers');

const router = express.Router();

router
  .route('/')
  .post(getWorkers)

router.route('/create')
  .post(createWorker);

router.route('/sendEmailCreationToWorker')
  .post(sendEmailCreationToWorker)

router.route('/getById')
  .post(getWorkerById);

router.route('/getByState')
  .post(getWorkersByState);


router
  .route('/:id')
  .get(getWorkerById)
  .put(updateWorker)
  .delete(deleteWorker)


module.exports = router;

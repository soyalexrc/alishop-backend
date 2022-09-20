const express = require('express');
const {
  changePassword,
  login,
  passwordRecovery
} = require('../controllers/auth');

const router = express.Router();

router
  .route('/login')
  .post(login)

router.route('/password-recovery')
  .post(passwordRecovery);

router
  .route('/change-password')
  .post(changePassword)


module.exports = router;

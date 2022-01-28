const { Router } = require('express');
const { check } = require('express-validator');
const { Login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/fieldValidator');
const { existEmail } = require('../shared/helpers/dbValidators');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Emails is not valid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateFields,
  ],
  Login
);

module.exports = router;

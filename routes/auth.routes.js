const { Router } = require('express');
const { check } = require('express-validator');
const { Login, GoogleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/fieldValidator');

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

router.post(
  '/google',
  [check('id_token', 'idToken is required').notEmpty(), validateFields],
  GoogleSignIn
);

module.exports = router;

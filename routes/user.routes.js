const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/fieldValidator');
const {
  isValidRole,
  existEmail,
  existUserById,
} = require('../shared/helpers/dbValidators');

const {
  GetUser,
  PostUser,
  PutUser,
  DeleteUser,
  PatchUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', GetUser);
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'Password is required and must be greater than 6 characters'
    ).isLength({ min: 6 }),
    check('email', 'Emails is not valid').isEmail(),
    check('email').custom(existEmail),
    check('role').custom(isValidRole),
    validateFields,
  ],
  PostUser
);
router.put(
  '/:id',
  [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validateFields,
  ],
  PutUser
);
router.delete('/', DeleteUser);
router.patch('/', PatchUser);

module.exports = router;

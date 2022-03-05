const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateJWT,
  validateFields,
  isRole,
  isAdminRole,
} = require('../middlewares');

const {
  isValidRole,
  existEmail,
  existUserById,
} = require('../shared/helpers/dbValidators');

const {
  GetUsers,
  GetUser,
  PostUser,
  PutUser,
  DeleteUser,
} = require('../controllers/user.controller');
const { EnumRoles } = require('../shared/types/enums/roles');

const router = Router();

router.get('/', GetUsers);
router.get(
  '/:id',
  [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
  ],
  GetUser
);
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
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    isRole(EnumRoles.ADMIN_ROLE, EnumRoles.USER_ROLE),
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
  ],
  DeleteUser
);

module.exports = router;

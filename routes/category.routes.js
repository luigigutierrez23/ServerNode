const { Router } = require('express');
const { check } = require('express-validator');

const {
  CreateCategory,
  EditCategory,
  DeleteCategory,
  GetCategory,
  GetCategories,
} = require('../controllers/category.controller');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const { existCategoryById } = require('../shared/helpers');

const router = Router();

//Get all categories
router.get('/', GetCategories);

//Get one category
router.get(
  '/:id',
  [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
  ],
  GetCategory
);

//Create a new category - Private
router.post(
  '/',
  [validateJWT, check('name', 'Name is required').notEmpty(), validateFields],
  CreateCategory
);

//Edit category - Private
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
  ],
  EditCategory
);

//Delete category - Only Admin Role
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
  ],
  DeleteCategory
);

module.exports = router;

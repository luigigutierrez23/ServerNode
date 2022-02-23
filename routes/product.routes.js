const { Router } = require('express');
const { check } = require('express-validator');

const {
  CreateProduct,
  GetProduct,
  GetProducts,
  EditProduct,
  DeleteProduct,
} = require('../controllers/product.controller');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const { existProductById } = require('../shared/helpers');

const router = Router();

//Get all categories
router.get('/', GetProducts);

//Get one product
router.get(
  '/:id',
  [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
  ],
  GetProduct
);

//Create a new product - Private
router.post(
  '/',
  [validateJWT, check('name', 'Name is required').notEmpty(), validateFields],
  CreateProduct
);

//Edit product - Private
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
  ],
  EditProduct
);

//Delete product - Only Admin Role
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
  ],
  DeleteProduct
);

module.exports = router;

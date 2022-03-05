const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFile } = require('../middlewares');
const { uploadFile, editFileUser, getImage } = require('../controllers/upload.controller');
const { allowedCollections } = require('../shared/helpers');

const router = Router();

router.post('/', validateFile, uploadFile);

router.put('/:collection/:id', [
    validateFile,
    check('id', 'Is not a valid id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], editFileUser);

router.get('/:collection/:id', [
    check('id', 'Is not a valid id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], getImage);

module.exports = router;

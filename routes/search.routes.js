const { Router } = require('express');
const { Search } = require('../controllers/search.controller');

const router = Router();

router.get('/:collection/:param', Search);
module.exports = router;

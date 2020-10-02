const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');

router.post('/sauces', sauceCtrl.sauces);
router.get('/sauces', sauceCtrl.element);
router.get('/:id', sauceCtrl.elementId);


module.exports = router;
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require ('../middleware/multer_config');

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.routeGeneral); 
router.post('/', auth, multer, saucesCtrl.creationSauces);
router.get('/:id', auth, saucesCtrl.ciblerSauces);
router.put('/:id', auth, multer, saucesCtrl.modifierSauces);
router.delete('/:id', auth, saucesCtrl.supprimerSauces);


module.exports = router;
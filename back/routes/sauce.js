const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauces');

router.get('api/sauces/', auth, sauceCtrl.getAllSauce);
router.post('api/sauces/', auth, multer, sauceCtrl.createSauce);
router.get('api/sauces/:id', auth, sauceCtrl.getOneSauce);
router.put('api/sauces/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('api/sauces/:id', auth, sauceCtrl.deleteSauce);

router.post('api/sauces/:id/like', auth, sauceCtrl.fctLike);

module.exports = router;
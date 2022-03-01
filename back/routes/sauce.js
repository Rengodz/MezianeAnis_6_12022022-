const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.get('/api/sauces', sauceCtrl.getAllSauce);
router.post('/api/sauces', sauceCtrl.createSauce);
router.get('/api/sauces/:id', sauceCtrl.getOneSauce);
router.put('/api/sauces/:id', sauceCtrl.modifySauce);
router.delete('/api/sauces/:id', sauceCtrl.deleteSauce);

module.exports = router;
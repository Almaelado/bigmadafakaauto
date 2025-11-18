var express = require('express');
var router = express.Router();

var autoController = require('../controllers/autoControllerMod');

router.get('/minden', autoController.osszes);
router.get('/egy/:id', autoController.egy);
router.post('/hozzad', autoController.hozzaad);
router.put('/modosit/:id', autoController.modosit);
router.delete('/torol/:id', autoController.torol);
router.get('/marka', autoController.getMarka);
router.get('/szin', autoController.getSzin);
router.get('/uzemanyag', autoController.getUzemanyag);
router.get('/szuro', autoController.szuro);

module.exports = router;

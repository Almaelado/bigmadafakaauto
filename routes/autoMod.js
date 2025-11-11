var express = require('express');
var router = express.Router();

var autoController = require('../controllers/autoControllerMod');

router.get('/', autoController.osszes);
router.get('/:id', autoController.egy);
router.post('/', autoController.hozzaad);
router.put('/:id', autoController.modosit);
router.delete('/:id', autoController.torol);

module.exports = router;

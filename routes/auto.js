var express = require('express');
var router = express.Router();

var autoController = require('../controllers/autoController');

router.get('/', autoController.osszes);

module.exports = router;
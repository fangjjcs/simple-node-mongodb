const express = require('express');

const controllers = require('../controller/controller');

const router = express.Router();

router.get('/one', controllers.getOneConfig);
router.get('/config', controllers.getConfig);
router.get('/ping', controllers.ping);

module.exports = router;

const express = require('express');
const router = express.Router();
const { searchBus } = require('../controller/Bus_controller');
const { uploadBusData } = require('../controller/Bus_database');

router.post('/search', searchBus);
router.post('/upload-bus', uploadBusData);

module.exports = router;

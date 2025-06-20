const express = require('express');
const router = express.Router();
const { searchMetro } = require('../controller/Metro_controller');
const { uploadMetroData } = require('../controller/Metro_database');

router.post('/search', searchMetro);
router.post('/upload-metro', uploadMetroData);

module.exports = router;

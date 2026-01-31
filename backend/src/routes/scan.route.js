const express = require('express');
const router = express.Router();
const { scanUrl } = require('../controllers/scan.controller');

router.post('/', scanUrl);

module.exports = router;
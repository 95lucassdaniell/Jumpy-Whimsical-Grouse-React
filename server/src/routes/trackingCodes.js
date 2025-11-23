const express = require('express');
const router = express.Router();
const { getPublicTrackingCodes } = require('../controllers/trackingCodes');

router.get('/', getPublicTrackingCodes);

module.exports = router;

const express = require('express');
const router = express.Router();
const {assetController} = require('../../controller');
const { requireSignin} = require('../../middleware');

// Upload Route
router.post('/upload', requireSignin, assetController.uploadController);

module.exports = router;
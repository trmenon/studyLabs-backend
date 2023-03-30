const express = require('express');
const router = express.Router();
const {assetController} = require('../../controller');
const { requireSignin} = require('../../middleware');

// Upload Route
router.post('/upload', requireSignin, assetController.uploadController);

// Serve Routes
router.get('/download/:file',  assetController.getMediaController);

module.exports = router;
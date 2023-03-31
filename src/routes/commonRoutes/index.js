const express = require('express');
const router = express.Router();
const {commonController} = require('../../controller');
const { requireSignin} = require('../../middleware');

// Fetch all user roles
router.get('/fetchAllRoles', requireSignin, commonController.fetchAllUserRolesController);

module.exports = router;
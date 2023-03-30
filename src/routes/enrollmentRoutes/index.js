const express = require('express');
const router = express.Router();
const {enrollmentController} = require('../../controller');
const { requireSignin} = require('../../middleware');

// Fetching all enrollment for user
router.get('/getEnrolledCoursesByUser/:id', requireSignin, enrollmentController.fetchAllEnrollmentByUserController)

module.exports = router;
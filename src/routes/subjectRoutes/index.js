const express = require('express');
const router = express.Router();
const { requireSignin} = require('../../middleware');
const { subjectController} = require('../../controller');

// Create New Subject
router.post("/createSubject", requireSignin, subjectController.createSubjectController);

// Fetch all subjects
router.get("/getAllSubjects", requireSignin, subjectController.getAllSubjectsController);

// Fetch subject by Id
router.get("/getSubjectById/:id", requireSignin, subjectController.getSubjectByIdController);

module.exports = router;
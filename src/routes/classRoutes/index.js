const express = require('express');
const router = express.Router();
const { classController} = require('../../controller');
const { requireSignin} = require('../../middleware');

// Fetching all classes
router.get('/getAllClasses', requireSignin, classController.getAllClassesController);

// Creating new Class
router.post('/createNewClass', requireSignin, classController.createNewClassController);

// Fetching details by Class-ID
router.get('/getClassById/:id', requireSignin, classController.getClassByIdController);

// Toggle status of class by Class-ID
router.put('/toggleClassStatus/:id', requireSignin, classController.toggleClassStatusController);

// Fetching Class-List by Tutor-ID
router.get('/getClassByTutor/:id', requireSignin, classController.getClassByTutorController);

// Update notes to class archives
router.put('/updateNotesToClass/:id/:note', requireSignin, classController.updateNotesToArchiveController);

module.exports = router;
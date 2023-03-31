const express = require('express');
const router = express.Router();
const { userController } = require('../../controller');
const { requireSignin } = require('../../middleware');

// Create New User [ADMIN]
router.post("/createUser/admin", userController.createAdminUser);
// Create New User [TUTOR]
router.post("/createUser/tutor", userController.createTutorUser);
// Create New User [STUDENT]
router.post("/createUser/student", userController.createStudentUser);
// Get all users
router.get("/getAllUsers", requireSignin, userController.getAllUsersController);
// Get all tutors
router.get("/getAllTutors", requireSignin, userController.getAllTutorsController);
// Get all users by filters role
router.get("/getAllUsersByRole/:role", requireSignin, userController.getUsersByRole);
// Fetching user details by id
router.get("/getUserById/:id", requireSignin, userController.getUserByIdController);
// Deleting user by id
router.put("/deleteUser/:id", requireSignin, userController.markUserAsDeletedById);

// User Signin
router.post("/signin", userController.signin);

// User Signout
router.get("/signout", userController.signout);

module.exports = router;
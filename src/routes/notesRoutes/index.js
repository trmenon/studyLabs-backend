const express = require('express');
const router = express.Router();
const { requireSignin} = require('../../middleware');
const { notesController} = require('../../controller');

// create New Note
router.post('/createNewNote', requireSignin, notesController.createNewNoteController);

module.exports = router;
const express = require('express');
const router = express.Router();

const noteController = require('../controllers/noteController');

router.get('/', noteController.getAll); // Get all notes
router.get('/:id', noteController.getOne); // Get a single note by ID
router.post('/:dealId', noteController.create); // Create a new note
router.get('/deal/:dealId', noteController.getNotesByDealId); // Get notes by deal ID


module.exports = router;
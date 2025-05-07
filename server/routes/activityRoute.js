const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Get all activities
router.get('/', activityController.getAll);
// Get a single activity by ID
router.get('/:id', activityController.getOne);
// Create a new activity
router.post('/user/:userId', activityController.create);
// Update an existing activity by ID
router.put('/:id', activityController.update);
// Delete an activity by ID
router.delete('/:id', activityController.delete);
// Get activities by customer ID
router.get('/customer/:customerId', activityController.getByCustomerId);
// Get activities by user ID
router.get('/user/:userId', activityController.getByUserId);
// Get activities by type
router.get('/type/:type', activityController.getByType);
// Get activities by status
router.get('/status/:status', activityController.getByStatus);


module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', userController.getAllUsers); // Get all users
router.get('/sales', userController.getSalesUsers); // Get all sales users
router.get('/:id',  userController.getOneUser); // Get user by ID
router.post('/',  userController.newUser); // Create a new user
router.put('/:id',  userController.updateUser); // Update user by ID
router.delete('/:id',  userController.deleteUser); // Delete user by ID

module.exports = router;

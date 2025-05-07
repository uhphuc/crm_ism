const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', customerController.getAll);
router.get('/:id', customerController.getOne);
router.post('/', customerController.create);
router.put('/:id', customerController.update);
router.put('/:id/assign', customerController.assignToUser); // Assign customer to sales
router.delete('/:id', customerController.delete);
router.get('/search', customerController.search); // Search and filter functionality
router.get('/:id/all',  customerController.getMyCustomers); // Get customers assigned to the logged-in user


module.exports = router;
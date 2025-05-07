const express = require('express');
const dealController = require('../controllers/dealController');

const router = express.Router();

// Thêm deal mới
router.post('/', dealController.createDeal);
router.put('/:id', dealController.updateDeal); // Cập nhật thông tin deal
// update deal stage
router.put('/:id/stage', dealController.updateDealStage); // Cập nhật giai đoạn deal
router.get('/', dealController.getDeals); // Lấy danh sách tất cả các deal
router.get('/:id', dealController.getDealById); // Lấy thông tin deal theo ID
router.get('/user/:userId', dealController.getDealsByUserId); // Lấy danh sách deal theo userId
router.get('/customer/:customerId', dealController.getDealsByCustomerId); // Lấy danh sách deal theo customerId


module.exports = router;

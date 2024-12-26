const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// API thanh toán
router.post('/payment', paymentController.processPayment);

// API lấy thông tin thanh toán theo ID
router.get('/payment/:id', paymentController.getPaymentById);

// API cập nhật trạng thái thanh toán
router.put('/payment/:id', paymentController.updatePaymentStatus);

module.exports = router;

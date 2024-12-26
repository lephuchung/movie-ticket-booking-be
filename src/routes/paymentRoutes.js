const express = require('express');
const {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
} = require('../controllers/paymentController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllPayments);
router.get('/:id', authenticateToken, getPaymentById);
router.post('/', authenticateToken, createPayment);
router.put('/:id', authenticateToken, updatePayment);
router.delete('/:id', authenticateToken, deletePayment);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Định nghĩa các route và liên kết đến các controller
router.get('/:username', userController.getUserDetails);
router.get('/:username/tickets', userController.getUserTickets);
router.get('/ticket/:ticketId', userController.getTicketDetails);

module.exports = router;

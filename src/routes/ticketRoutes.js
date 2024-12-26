const express = require('express');
const {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketsByUserEmail,
    getTicketsByShowtimeId,
} = require('../controllers/ticketController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Lấy ticket được đặt bởi một người
router.get('/user/:email', getTicketsByUserEmail);
router.get('/showtime/:showtimeId', getTicketsByShowtimeId)
router.get('/', authenticateToken, getAllTickets);
router.get('/:id', authenticateToken, authenticateToken, getTicketById);
router.post('/', authenticateToken, createTicket);
router.put('/:id', authenticateToken, updateTicket);
router.delete('/:id', authenticateToken, deleteTicket);


module.exports = router;

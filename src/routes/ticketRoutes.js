const express = require('express');
const {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketsByUserEmail,
} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
// Lấy ticket được đặt bởi một người
router.get('/user/:email', getTicketsByUserEmail);

module.exports = router;

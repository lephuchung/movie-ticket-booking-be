const express = require('express');
const {
    getAllSeats,
    getSeatById,
    createSeat,
    updateSeat,
    deleteSeat,
    getSeatsByRoomId,
} = require('../controllers/seatController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/room/:roomId', getSeatsByRoomId);
router.get('/', getAllSeats);
router.get('/:id', getSeatById);
router.post('/', authenticateToken, createSeat);
router.put('/:id', authenticateToken, updateSeat);
router.delete('/:id', authenticateToken, deleteSeat);

module.exports = router;

const express = require('express');
const {
    getAllSeats,
    getSeatById,
    createSeat,
    updateSeat,
    deleteSeat,
} = require('../controllers/seatController');

const router = express.Router();

router.get('/', getAllSeats);
router.get('/:id', getSeatById);
router.post('/', createSeat);
router.put('/:id', updateSeat);
router.delete('/:id', deleteSeat);

module.exports = router;

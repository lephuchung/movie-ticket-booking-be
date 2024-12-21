const express = require('express');
const {
    getAllShowtimes,
    getShowtimeById,
    createShowtime,
    updateShowtime,
    deleteShowtime,
} = require('../controllers/showtimeController');

const router = express.Router();

router.get('/', getAllShowtimes);
router.get('/:id', getShowtimeById);
router.post('/', createShowtime);
router.put('/:id', updateShowtime);
router.delete('/:id', deleteShowtime);

module.exports = router;

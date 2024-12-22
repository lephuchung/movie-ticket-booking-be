const express = require('express');
const {
    getAllShowtimes,
    getShowtimeById,
    createShowtime,
    updateShowtime,
    deleteShowtime,
    getShowtimesForMovieByLocationAndTimeRange,
    getShowtimesForMovieByTimeRange,
} = require('../controllers/showtimeController');

const router = express.Router();

router.get('/', getAllShowtimes);
router.get('/:id', getShowtimeById);
router.post('/', createShowtime);
router.put('/:id', updateShowtime);
router.delete('/:id', deleteShowtime);
router.get('/:movieId/:location/:startTime/:endTime', getShowtimesForMovieByLocationAndTimeRange);
router.get('/:movieId/:startTime/:endTime', getShowtimesForMovieByTimeRange);

module.exports = router;

const express = require('express');
const {
    getAllTheaters,
    getTheaterById,
    createTheater,
    updateTheater,
    deleteTheater,
    getLocations,
    getTheatersShowingMovie,
} = require('../controllers/theaterController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/movies/:MovieId', getTheatersShowingMovie);
router.get('/locations', getLocations);
router.get('/', getAllTheaters);
router.get('/:id', getTheaterById);
router.post('/', authenticateToken, createTheater);
router.put('/:id', authenticateToken, updateTheater);
router.delete('/:id', authenticateToken, deleteTheater);

module.exports = router;

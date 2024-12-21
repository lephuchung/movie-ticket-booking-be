const express = require('express');
const {
    getAllTheaters,
    getTheaterById,
    createTheater,
    updateTheater,
    deleteTheater,
} = require('../controllers/theaterController');

// router.get('/locations', movieController.getLocations); viết lại trong theater
// router.get('/showing_movie/:title', movieController.getTheatersShowingMovieNationwide); viết lại trông theater

const router = express.Router();

router.get('/', getAllTheaters);
router.get('/:id', getTheaterById);
router.post('/', createTheater);
router.put('/:id', updateTheater);
router.delete('/:id', deleteTheater);

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign Up
router.post('/signup', authController.signup);

// Sign In
router.post('/signin', authController.signin);

// Sign Out
router.post('/signout', authController.signout);

module.exports = router;

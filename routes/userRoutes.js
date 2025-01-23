const express = require('express');
const router = express.Router();

const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');  // Assuming you have a middleware to protect routes

// Protect the routes to make sure only authenticated users can access their profile
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);

module.exports = router;

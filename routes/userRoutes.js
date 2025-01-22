const express = require('express');
const { updateProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for updating user profile
router.put('/profile', protect, updateProfile);

module.exports = router;

const express = require('express');
const { getMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getMenuItems); 
router.get('/:id', getMenuItemById); 
router.post('/', protect, createMenuItem); 
router.put('/:id', protect, updateMenuItem); 
router.delete('/:id', protect, deleteMenuItem); 

module.exports = router;

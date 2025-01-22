const express = require('express');
const { createOrder, getOrders, getOrderDetails, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create an order
router.post('/', protect, createOrder);

// Get all orders for a user
router.get('/', protect, getOrders);

// Get details of a specific order by orderId
router.get('/:orderId', protect, getOrderDetails);

// Update order status (admin only)
router.put('/:orderId/status', protect, admin, updateOrderStatus);

module.exports = router;

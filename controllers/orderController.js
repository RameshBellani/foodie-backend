const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// Create a new order
exports.createOrder = async (req, res) => {
  const { items, total, address, paymentMethod } = req.body;

  // Check if all menuItems exist in the database
  for (let item of items) {
    const menuItem = await MenuItem.findById(item.menuItem);  // Check if menuItem exists
    if (!menuItem) {
      return res.status(404).json({ message: `Menu item with ID ${item.menuItem} not found` });
    }
  }

  // Create a new order instance and save it to the database
  const order = new Order({
    userId: req.user._id,
    items,
    total,
    address,
    paymentMethod
  });

  try {
    await order.save();  // Save the new order instance
    res.status(201).json(order);  // Respond with the created order
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Get all orders for the user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Get details of a specific order
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.menuItem');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error: error.message });
  }
};

// Update the status of an order (admin only)
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order status
    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

const MenuItem = require('../models/MenuItem');

// Get all menu items
exports.getMenuItems = async (req, res, next) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    next(error);
  }
};

// Get menu item by ID
exports.getMenuItemById = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    next(error);
  }
};

// Create a new menu item (Admin only)
exports.createMenuItem = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { name, description, price, image, category, available, rating } = req.body;

    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      image,
      category,
      available,
      rating,
      reviews: [],
    });

    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    next(error);
  }
};

// Update an existing menu item (Admin only)
exports.updateMenuItem = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(updatedMenuItem);
  } catch (error) {
    next(error);
  }
};

// Delete a menu item (Admin only)
exports.deleteMenuItem = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

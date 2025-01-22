const User = require('../models/User');
const Address = require('../models/Address');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.updateProfile = async (req, res) => {
  const { name, email, phone, password, addresses } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is already in use by another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    // Update password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Update addresses in the user model itself
    if (addresses) {
      user.addresses = addresses.map(addr => ({
        street: addr.street,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        isDefault: addr.isDefault || false
      }));
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};




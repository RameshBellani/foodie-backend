const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes by ensuring the user is authenticated
const protect = async (req, res, next) => {
  let token;
  
  // Check if token exists in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, return unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user to the request object
    req.user = await User.findById(decoded.id);
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    // If invalid token, return unauthorized response
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

// Admin middleware for protecting admin routes
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next(); // If user is admin, continue
  }
  return res.status(403).json({ message: 'Not authorized as an admin' });
};

module.exports = { protect, admin };

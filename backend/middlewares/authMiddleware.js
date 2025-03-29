// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to protect routes and check for the required role
const protectRoute = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from the Authorization header

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, 'your-secret-key');  // Replace 'your-secret-key' with your actual secret key
console.log("decoded: ", decoded)
      // Check if the user has the required role
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied, insufficient role' });
      }

      // Attach user to request object
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

module.exports = {
  protectRoute,
};

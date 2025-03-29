// routes/auth.js
const express = require('express');
const { protectRoute } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

// POST /register route
router.post('/register', authController.register);

// POST /login route
router.post('/login', authController.login);

router.get('/users', protectRoute(['patient', 'provider']), userController.getUsers);

router.get('/dashboard', protectRoute(['patient']), (req, res) => {
	res.json({
	  message: 'Welcome to the provider dashboard',
	  user: req.user.email, // The user object is attached to the request
	});
  });

module.exports = router;

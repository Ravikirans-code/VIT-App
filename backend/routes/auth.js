// routes/auth.js
const express = require('express');
const { protectRoute } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const router = express.Router();

// POST /register route
router.post('/register', authController.register);

// POST /login route
router.post('/login', authController.login);

router.get('/dashboard', protectRoute('user'), (req, res) => {
	res.json({
	  message: 'Welcome to the provider dashboard',
	  user: req.user.email, // The user object is attached to the request
	});
  });

module.exports = router;

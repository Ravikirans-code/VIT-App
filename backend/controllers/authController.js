// controllers/authController.js
const sendResponse = require('../utils/response');
const authService = require('../services/authService');

// Register route
const register = async (req, res) => {
  const { name, email, password, dateOfBirth, gender, address, role, medicalHistory, createdBy } = req.body;

  try {
    const newUser = await authService.register({
      name,
      email,
      password,
      dateOfBirth,
      gender,
      address,
      role,
      medicalHistory,
      createdBy,
    });
    sendResponse(res, 201, 'User registered successfully', { user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login route
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
};

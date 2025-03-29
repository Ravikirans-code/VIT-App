// controllers/authController.js
const sendResponse = require('../utils/response');
const userService = require('../services/userService');

// Login route
const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers(req);
        sendResponse(res, 200, '', users);
    } catch (error) {
        sendResponse(res, 500, 'Error fetching users', {});
    }
};

module.exports = {
    getUsers,
};

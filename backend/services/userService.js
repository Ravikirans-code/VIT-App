const User = require('../models/user');  // Import User model


const getAllUsers = async (req) => {

    try {
        const { role, gender, email } = req.query;
        const filters = {};

        if (role) filters.role = role; // Add role filter if provided
        if (gender) filters.gender = gender; // Add gender filter if provided
        if (email) filters.gender = email; // Add gender filter if provided

        return await User.find(filters); // Fetch users based on filters
    } catch (error) {
        throw new Error('Error filtering users: ' + error.message);
    }
};

module.exports = {
    getAllUsers
};

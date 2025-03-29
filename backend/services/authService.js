// services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Import User model
const bcrypt = require('bcryptjs');

// User Registration
const register = async ({
    name,
    email,
    password,
    dateOfBirth,
    gender,
    address,
    role = 'patient',
    medicalHistory = [],
    createdBy,
}) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        dateOfBirth,
        gender,
        address,
        role,
        medicalHistory,
        createdBy,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await newUser.save();

    return newUser;
};

// User Login
const login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { email: user.email, role: user.role },
            'your-secret-key',
            { expiresIn: '1h' }
        );
        return token;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    register,
    login,
};

// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false, unique: false },
    password: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
    address: { type: String, required: false },
    role: { type: String, enum: ['provider', 'patient'], default: 'patient' },
    medicalHistory: { type: [String], default: [] },
    pastVaccinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vaccination' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String, required: false },
    createdBy: { type: String, required: false },
});


// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  });
  
  // Method to compare password
  userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;
// Vaccination Schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const vaccinationSchema = new mongoose.Schema({
    vaccineName: { type: String, required: true },
    manufacturer: { type: String, required: true },
    dosesRequired: { type: Number, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;

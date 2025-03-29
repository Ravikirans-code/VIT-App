const Vaccination = require('../models/Vaccination');

// Add new vaccination
const addVaccination = async (vaccinationData) => {
    try {
        const vaccination = new Vaccination(vaccinationData);
        return await vaccination.save();
    } catch (error) {
        throw new Error('Error adding vaccination: ' + error.message);
    }
};

// Update vaccination by ID
const updateVaccination = async (id, updatedData) => {
    try {
        return await Vaccination.findByIdAndUpdate(id, updatedData, { new: true });
    } catch (error) {
        throw new Error('Error updating vaccination: ' + error.message);
    }
};

// Get all vaccinations
const getAllVaccinations = async () => {
    try {
        return await Vaccination.find();
    } catch (error) {
        throw new Error('Error fetching vaccinations: ' + error.message);
    }
};

// Get vaccination by ID
const getVaccinationById = async (id) => {
    try {
        return await Vaccination.findById(id);
    } catch (error) {
        throw new Error('Error fetching vaccination: ' + error.message);
    }
};

module.exports = {
    addVaccination,
    updateVaccination,
    getAllVaccinations,
    getVaccinationById
};

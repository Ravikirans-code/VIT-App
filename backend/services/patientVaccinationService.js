const PatientVaccination = require('../models/patientVaccination');

// Add new patient vaccination record
const addPatientVaccination = async (vaccinationData) => {
    try {
        const patientVaccination = new PatientVaccination(vaccinationData);
        return await patientVaccination.save();
    } catch (error) {
        throw new Error('Error adding patient vaccination: ' + error.message);
    }
};

// Update patient vaccination record by ID
const updatePatientVaccination = async (id, updatedData) => {
    try {
        return await PatientVaccination.findByIdAndUpdate(id, updatedData, { new: true });
    } catch (error) {
        throw new Error('Error updating patient vaccination: ' + error.message);
    }
};

// Get all patient vaccination records
const getAllPatientVaccinations = async () => {
    try {
        return await PatientVaccination.find().populate('patientId').populate('vaccinationId').populate('administeredBy');
    } catch (error) {
        throw new Error('Error fetching patient vaccination records: ' + error.message);
    }
};

// Get patient vaccination record by ID
const getPatientVaccinationById = async (id) => {
    try {
        return await PatientVaccination.findById(id).populate('patientId').populate('vaccinationId').populate('administeredBy');
    } catch (error) {
        throw new Error('Error fetching patient vaccination record: ' + error.message);
    }
};

module.exports = {
    addPatientVaccination,
    updatePatientVaccination,
    getAllPatientVaccinations,
    getPatientVaccinationById
};

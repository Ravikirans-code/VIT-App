const patientVaccinationService = require('../services/patientVaccinationService');
const sendResponse = require('../utils/response');

// Add a new patient vaccination record
const addPatientVaccination = async (req, res) => {
    try {
        const vaccinationData = req.body;
        const patientVaccination = await patientVaccinationService.addPatientVaccination(vaccinationData);
        sendResponse(res, 201, 'Patient vaccination record added successfully', patientVaccination);
    } catch (error) {
        sendResponse(res, 500, 'Error adding patient vaccination', error);
    }
};

// Update patient vaccination record by ID
const updatePatientVaccination = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedVaccination = await patientVaccinationService.updatePatientVaccination(id, updatedData);

        if (!updatedVaccination) {
            return res.status(404).json({ message: 'Patient vaccination record not found' });
        }
        sendResponse(res, 200, 'Patient vaccination record updated successfully', updatedVaccination);
    } catch (error) {
        sendResponse(res, 500, 'Error updating patient vaccination', error);
    }
};

// Get all patient vaccination records
const getAllPatientVaccinations = async (req, res) => {
    try {
        const patientVaccinations = await patientVaccinationService.getAllPatientVaccinations();
        sendResponse(res, 200, '', patientVaccinations);
    } catch (error) {
        sendResponse(res, 500, 'Error fetching patient vaccination records', error);
    }
};

// Get patient vaccination record by ID
const getPatientVaccinationById = async (req, res) => {
    try {
        const { id } = req.params;
        const patientVaccination = await patientVaccinationService.getPatientVaccinationById(id);

        if (!patientVaccination) {
            return res.status(404).json({ message: 'Patient vaccination record not found' });
        }
        sendResponse(res, 200, '', patientVaccination);
    } catch (error) {
        sendResponse(res, 500, 'Error fetching patient vaccination record', error);
    }
};

module.exports = {
    addPatientVaccination,
    updatePatientVaccination,
    getAllPatientVaccinations,
    getPatientVaccinationById
};

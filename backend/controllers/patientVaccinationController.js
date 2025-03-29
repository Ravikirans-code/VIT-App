const patientVaccinationService = require('../services/patientVaccinationService');

// Add a new patient vaccination record
const addPatientVaccination = async (req, res) => {
    try {
        const vaccinationData = req.body;
        const patientVaccination = await patientVaccinationService.addPatientVaccination(vaccinationData);
        res.status(201).json({ message: 'Patient vaccination record added successfully', patientVaccination });
    } catch (error) {
        res.status(500).json({ message: 'Error adding patient vaccination', error: error.message });
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

        res.status(200).json({ message: 'Patient vaccination record updated successfully', updatedVaccination });
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient vaccination', error: error.message });
    }
};

// Get all patient vaccination records
const getAllPatientVaccinations = async (req, res) => {
    try {
        const patientVaccinations = await patientVaccinationService.getAllPatientVaccinations();
        res.status(200).json(patientVaccinations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient vaccination records', error: error.message });
    }
};

// Get patient vaccination record by ID
const getPatientVaccinationById = async (req, res) => {
    const { id, patientId, vaccinationId, status } = req.params;
    try {
        const patientVaccination = await patientVaccinationService.getPatientVaccinationById(req);

        if (!patientVaccination) {
            return res.status(404).json({ message: 'Patient vaccination record not found' });
        }

        res.status(200).json(patientVaccination);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient vaccination record', error: error.message });
    }
};

module.exports = {
    addPatientVaccination,
    updatePatientVaccination,
    getAllPatientVaccinations,
    getPatientVaccinationById
};

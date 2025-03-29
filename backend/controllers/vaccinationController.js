const vaccinationService = require('../services/vaccinationService');

// Add a new vaccination
const addVaccination = async (req, res) => {
    try {
        const vaccinationData = req.body;
        const vaccination = await vaccinationService.addVaccination(vaccinationData);
        res.status(201).json({ message: 'Vaccination added successfully', vaccination });
    } catch (error) {
        res.status(500).json({ message: 'Error adding vaccination', error: error.message });
    }
};

// Update vaccination by ID
const updateVaccination = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedVaccination = await vaccinationService.updateVaccination(id, updatedData);

        if (!updatedVaccination) {
            return res.status(404).json({ message: 'Vaccination not found' });
        }

        res.status(200).json({ message: 'Vaccination updated successfully', updatedVaccination });
    } catch (error) {
        res.status(500).json({ message: 'Error updating vaccination', error: error.message });
    }
};

// Get all vaccinations
const getAllVaccinations = async (req, res) => {
    try {
        const vaccinations = await vaccinationService.getAllVaccinations();
        res.status(200).json(vaccinations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vaccinations', error: error.message });
    }
};

// Get vaccination by ID
const getVaccinationById = async (req, res) => {
    try {
        const { id } = req.params;
        const vaccination = await vaccinationService.getVaccinationById(id);

        if (!vaccination) {
            return res.status(404).json({ message: 'Vaccination not found' });
        }

        res.status(200).json(vaccination);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vaccination', error: error.message });
    }
};

module.exports = {
    addVaccination,
    updateVaccination,
    getAllVaccinations,
    getVaccinationById
};

const vaccinationService = require('../services/vaccinationService');
const sendResponse = require('../utils/response');

// Add a new vaccination
const addVaccination = async (req, res) => {
    try {
        const vaccinationData = req.body;
        const vaccination = await vaccinationService.addVaccination(vaccinationData);
        sendResponse(res, 201, 'Vaccination added successfully', vaccination);
    } catch (error) {
        sendResponse(res, 500, 'Error adding vaccination', error);
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
        sendResponse(res, 200, 'Vaccination updated successfully', updatedVaccination);
    } catch (error) {
        sendResponse(res, 500, "Error updating vaccination", error);
    }
};

// Get all vaccinations
const getAllVaccinations = async (req, res) => {
    try {
        const vaccinations = await vaccinationService.getAllVaccinations();
        sendResponse(res, 200, "", vaccinations);
    } catch (error) {
        sendResponse(res, 500, "Error fetching vaccinations", error);
    }
};

// Get vaccination by ID
const getVaccinationById = async (req, res) => {
    try {
        const { id } = req.params;
        const vaccination = await vaccinationService.getVaccinationById(id);

        if (!vaccination) {
            return sendResponse(res, 404, "Vaccination not found", {});
        }
        sendResponse(res, 200, '', vaccination);
    } catch (error) {
        return sendResponse(res, 500, "Error fetching vaccination", error);
    }
};

module.exports = {
    addVaccination,
    updateVaccination,
    getAllVaccinations,
    getVaccinationById
};

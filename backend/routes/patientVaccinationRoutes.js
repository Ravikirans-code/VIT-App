const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middlewares/authMiddleware');
const patientVaccinationController = require('../controllers/patientVaccinationController');

// Route to add a patient vaccination record
router.post('/patient-vaccinations', protectRoute(['provider']), patientVaccinationController.addPatientVaccination);

// Route to update patient vaccination record by ID
router.put('/patient-vaccinations/:id',  patientVaccinationController.updatePatientVaccination);

// Route to get all patient vaccination records
router.get('/patient-vaccinations', patientVaccinationController.getAllPatientVaccinations);

// Route to get patient vaccination record by ID
router.get('/patient-vaccinations/:id', patientVaccinationController.getPatientVaccinationById);

module.exports = router;

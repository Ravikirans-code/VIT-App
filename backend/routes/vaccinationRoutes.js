const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middlewares/authMiddleware');
const vaccinationController = require('../controllers/vaccinationController');

// Route to add a vaccination
router.post('/vaccinations', protectRoute(['provider']), vaccinationController.addVaccination);

// Route to update vaccination by ID
router.put('/vaccinations/:id', protectRoute(['provider']), vaccinationController.updateVaccination);

// Route to get all vaccinations
router.get('/vaccinations', protectRoute(['provider']), vaccinationController.getAllVaccinations);

// Route to get vaccination by ID
router.get('/vaccinations/:id', protectRoute(['provider']), vaccinationController.getVaccinationById);

module.exports = router;

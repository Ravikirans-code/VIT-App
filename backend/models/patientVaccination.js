const mongoose = require('mongoose');

const patientVaccinationSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vaccinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaccination', required: true },
    doseNumber: { type: Number, required: true },
    dateAdministered: { type: Date, required: true },
    administeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Completed', 'Pending', 'Missed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const PatientVaccination = mongoose.model('PatientVaccination', patientVaccinationSchema);

module.exports = PatientVaccination;

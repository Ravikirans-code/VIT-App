const mongoose = require('mongoose');

const vaccineRecommendationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recommendedVaccines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vaccination' }],
    reason: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const VaccineRecommendation = mongoose.model('VaccineRecommendation', vaccineRecommendationSchema);

module.exports = VaccineRecommendation;
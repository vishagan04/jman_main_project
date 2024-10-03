// models/Assessment.js

const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // Add other fields as necessary
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);
module.exports = Assessment;

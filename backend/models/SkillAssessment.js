// models/SkillAssessment.js

const mongoose = require('mongoose');

const SkillAssessmentSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  certification: { type: String, required: true },
  skills: { type: String, required: true },
  marks: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const SkillAssessment = mongoose.model('SkillAssessment', SkillAssessmentSchema);
module.exports = SkillAssessment;

// backend/models/EmployeeSkillAssessment.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Auto-incrementing package

const EmployeeSkillAssessmentSchema = new mongoose.Schema({
  assessmentId: { type: Number, unique: true }, // Unique assessment ID
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, // Reference to Employee model
  certification: { type: String, required: true }, // Certification completed
  skills: { type: String, required: true }, // Skills obtained
  marks: { type: Number, required: true }, // Marks scored
  date: { type: Date, default: Date.now }, // Date of assessment
});

// Apply the AutoIncrement plugin to the assessmentId field
EmployeeSkillAssessmentSchema.plugin(AutoIncrement, { inc_field: 'assessmentId' });

const EmployeeSkillAssessment = mongoose.model('EmployeeSkillAssessment', EmployeeSkillAssessmentSchema);
module.exports = EmployeeSkillAssessment;

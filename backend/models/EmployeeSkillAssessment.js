// models/EmployeeSkillAssessment.js


const mongoose = require('mongoose');

const EmployeeSkillAssessmentSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true , unique:true},
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  certification: { type: String, required: true },
  skills: { type: String, required: true },
  marks: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

EmployeeSkillAssessmentSchema.plugin(AutoIncrement, { inc_field: 'assessmentId' });


const EmployeeSkillAssessment = mongoose.model('EmployeeSkillAssessment', EmployeeSkillAssessmentSchema);
module.exports = EmployeeSkillAssessment;

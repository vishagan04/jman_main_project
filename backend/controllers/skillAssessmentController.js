const SkillAssessment = require('../models/SkillAssessment');

// Submit a skill assessment
exports.submitSkillAssessment = async (req, res) => {
  const { employeeId, assessmentId, certification, skills, marks } = req.body;
  const skillAssessment = new SkillAssessment({ employeeId, assessmentId, certification, skills, marks });
  
  try {
    await skillAssessment.save();
    res.status(201).json(skillAssessment);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting skill assessment' });
  }
};

// Get skill assessments by employee
exports.getSkillAssessmentsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const skillAssessments = await SkillAssessment.find({ employeeId }).populate('assessmentId');
    res.status(200).json(skillAssessments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skill assessments' });
  }
};

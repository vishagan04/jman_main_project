const Assessment = require('../models/Assessment');

// Get all assessments
exports.getAssessments = async (req, res) => {

  try {
    const assessments = await Assessment.find();
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assessments' });
  }
};

// Add a new assessment
exports.createAssessment = async (req, res) => {
  const { name, description } = req.body;
  const assessment = new Assessment({ name, description });
  try {
    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating assessment' });
  }
};

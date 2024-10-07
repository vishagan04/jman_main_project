const SkillAssessment = require('../models/EmployeeSkillAssessment'); // Import the model

// Submit a skill assessment for an employee
exports.submitEmployeeSkillAssessment = async (req, res) => {
  const { certification, skills, marks } = req.body;
  const employeeId = req.employee._id;

  // Validate the request body
  if (!employeeId || !certification || !skills || !marks) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const skillAssessment = new SkillAssessment({
    employeeId ,
    certification,
    skills,
    marks,
    approvalStatus: 'Pending', // Set approval status to "Pending" upon submission
  });

  try {
    const savedAssessment = await skillAssessment.save();
    res.status(201).json(savedAssessment);
  } catch (error) {
    console.error('Error submitting skill assessment:', error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error submitting skill assessment', error: error.message });
  }
};

// Get skill assessments by employee
exports.getSkillAssessmentsByEmployee = async (req, res) => {
  const employeeId = req.params.employeeId;

  if (!employeeId) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    const skillAssessments = await SkillAssessment.find({ employeeId })
      .populate('employeeId'); // Populate the employeeId reference
    res.status(200).json(skillAssessments);
  } catch (error) {
    console.error('Error fetching skill assessments:', error);
    res.status(500).json({ message: 'Error fetching skill assessments', error: error.message });
  }
};

// Get all skill assessments
exports.getAllSkillAssessments = async (req, res) => {
  try {
    const skillAssessments = await SkillAssessment.find()
      .populate('employeeId'); // Populate the employeeId reference
    res.status(200).json(skillAssessments);
  } catch (error) {
    console.error('Error fetching all skill assessments:', error);
    res.status(500).json({ message: 'Error fetching all skill assessments', error: error.message });
  }
};

// Delete a skill assessment by ID
exports.deleteEmployeeSkillAssessment = async (req, res) => {
  const { id } = req.params; // Get the assessment ID from request parameters

  try {
    const deletedAssessment = await SkillAssessment.findByIdAndDelete(id);

    if (!deletedAssessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    res.status(200).json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill assessment:', error);
    res.status(500).json({ message: 'Error deleting skill assessment', error: error.message });
  }
};

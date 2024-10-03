const SkillAssessment = require('../models/SkillAssessment');

// Submit a skill assessment for an employee
exports.submitEmployeeSkillAssessment = async (req, res) => {
  const { employeeId, certification, skills, marks } = req.body;
  console.log("Empolyee ID : ", req.employee.employeeId)
  // Validate the request body
  if (!req.employee.employeeId || !certification || !skills || !marks) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const skillAssessment = new SkillAssessment({
    employeeId,
    certification,
    skills,
    marks,
  });
  console.log(skillAssessment)
  try {
    const savedAssessment = await skillAssessment.save();
    res.status(201).json(savedAssessment);
  } catch (error) {
    console.error('Error submitting skill assessment:', error); // Log the error for debugging
    // Handle validation errors specifically
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error submitting skill assessment', error: error.message });
  }
};

// Get skill assessments by employee
exports.getSkillAssessmentsByEmployee = async (req, res) => {
  const { employeeId } = req.params;

  // Validate the employeeId parameter
  if (!employeeId) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    const skillAssessments = await SkillAssessment.find({ employeeId })
      .populate('assessmentId'); // Ensure assessmentId is populated
    res.status(200).json(skillAssessments);
  } catch (error) {
    console.error('Error fetching skill assessments:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching skill assessments', error: error.message });
  }
};

// backend/controllers/EmployeeSkillAssessmentController.js

const SkillAssessment = require('../models/EmployeeSkillAssessment'); // Import the model

// Submit a skill assessment for an employee
exports.submitEmployeeSkillAssessment = async (req, res) => {
  const {certification, skills, marks } = req.body;

  const employeeId = req.employee._id
  // Validate the request body
  if (!employeeId || !certification || !skills || !marks) {
    return res.status(400).json({ message: 'All fields are required' }); // Return error if any field is missing
  }
  const skillAssessment = new SkillAssessment({
    employeeId,
    certification,
    skills,
    marks,
  });

  console.log(skillAssessment); // Log the skill assessment for debugging
  
  try {
    const savedAssessment = await skillAssessment.save(); // Save the assessment to the database
    res.status(201).json(savedAssessment); // Return the saved assessment
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
  
  const employeeId = req.params.employeeId

  // Validate the employeeId parameter
  if (!employeeId) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    const skillAssessments = await SkillAssessment.find({ employeeId })
      .populate('employeeId'); // Populate the employeeId reference
    res.status(200).json(skillAssessments); // Return the assessments
  } catch (error) {
    console.error('Error fetching skill assessments:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching skill assessments', error: error.message });
  }
};



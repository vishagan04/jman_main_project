const express = require('express');
const {
  submitEmployeeSkillAssessment,
  getSkillAssessmentsByEmployee,
  getAllSkillAssessments,  // Import the new function
  deleteEmployeeSkillAssessment,
} = require('../controllers/EmployeeSkillAssessmentController');

const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

// Route to submit a skill assessment for an employee
router.post('/', authMiddleware, submitEmployeeSkillAssessment);

// Route to get skill assessments for a specific employee
router.get('/:employeeId', authMiddleware, getSkillAssessmentsByEmployee);

// Route to fetch all skill assessments
router.get('/', getAllSkillAssessments);  // New route for fetching all assessments

// Route to delete a skill assessment by ID
router.delete('/:id', authMiddleware, deleteEmployeeSkillAssessment);

module.exports = router;

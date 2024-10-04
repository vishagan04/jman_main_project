// backend/routes/employeeSkillAssessment.js

const express = require('express');
const {
  submitEmployeeSkillAssessment,
  getSkillAssessmentsByEmployee,
  // updateEmployeeSkillAssessment, // Updated function name
  deleteEmployeeSkillAssessment,
} = require('../controllers/EmployeeSkillAssessmentController');

const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

// Route to submit a skill assessment for an employee
router.post('/', authMiddleware, submitEmployeeSkillAssessment);

// Route to get skill assessments for a specific employee
router.get('/:employeeId', authMiddleware, getSkillAssessmentsByEmployee); // Added authMiddleware for security

// Route to update a skill assessment by ID
// router.put('/:id', authMiddleware, updateEmployeeSkillAssessment); // Updated function name for clarity

// Route to delete a skill assessment by ID
router.delete('/:id', authMiddleware, deleteEmployeeSkillAssessment); // Use DELETE for removals

module.exports = router;

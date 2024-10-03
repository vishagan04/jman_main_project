const express = require('express');
const { submitEmployeeSkillAssessment, getSkillAssessmentsByEmployee } = require('../controllers/EmployeeSkillAssessmentController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware')


// Route to submit a skill assessment for an employee
router.post('/', authMiddleware, submitEmployeeSkillAssessment);

// Route to get skill assessments for a specific employee
router.get('/:employeeId', getSkillAssessmentsByEmployee);

module.exports = router;

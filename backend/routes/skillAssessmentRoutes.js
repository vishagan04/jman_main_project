const express = require('express');
const { submitSkillAssessment, getSkillAssessmentsByEmployee } = require('../controllers/skillAssessmentController');
const router = express.Router();

// Route to submit a skill assessment
router.post('/', submitSkillAssessment);

// Route to get skill assessments for a specific employee
router.get('/:employeeId', getSkillAssessmentsByEmployee);

module.exports = router;

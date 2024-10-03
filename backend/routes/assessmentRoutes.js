const express = require('express');
const { getAssessments, createAssessment } = require('../controllers/assessmentController');
const router = express.Router();

// Route to get all assessments
router.get('/', getAssessments);

// Route to create a new assessment
router.post('/', createAssessment);

module.exports = router;

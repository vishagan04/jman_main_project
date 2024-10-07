const express = require('express');
const { getAllAssessments, updateApprovalStatus } = require('../controllers/SkillApprovalController');
const router = express.Router();

// Fetch all assessments
router.get('/', getAllAssessments);

// Approve or reject an assessment
router.put('/:id/approval', updateApprovalStatus);

module.exports = router;

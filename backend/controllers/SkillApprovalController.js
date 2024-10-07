const EmployeeSkillAssessment = require("../models/EmployeeSkillAssessment");
const SkillAssessment = require("../models/SkillAssessment");

// Fetch all assessments for admin review
const getAllAssessments = async (req, res) => {
    try {
        const assessments = await SkillAssessment.find().populate('employeeId', 'employeeName');
        res.json(assessments);
    } catch (error) {
        console.error("Error fetching assessments:", error);
        res.status(500).json({ error: "Failed to fetch assessments" });
    }
};

// Approve or reject an assessment
const updateApprovalStatus = async (req, res) => {
    const { approvalStatus } = req.body;
    const assessmentId = req.params.id; 
    console.log(approvalStatus, assessmentId);

    try {
        if (!["Approved", "Rejected"].includes(approvalStatus)) {
            return res.status(400).json({ error: "Invalid approval status" });
        }

        const updatedAssessment = await EmployeeSkillAssessment.findByIdAndUpdate(
            assessmentId, 
            { approvalStatus },
            { new: true } 
        );
        // const updatedAssessment = await EmployeeSkillAssessment.findById(assessmentId)
        console.log(updatedAssessment)
        if (!updatedAssessment) {
            return res.status(404).json({ error: "Assessment not found" });
        }

        res.json(updatedAssessment);
    } catch (error) {
        console.error("Error updating approval status:", error);
        res.status(500).json({ error: "Failed to update approval status" });
    }
};

module.exports = { getAllAssessments, updateApprovalStatus };

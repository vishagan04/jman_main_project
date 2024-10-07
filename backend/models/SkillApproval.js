const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // Auto-incrementing package

const SkillApprovalSchema = new mongoose.Schema({
    approvalId: { type: Number, unique: true }, // Unique approval ID
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeSkillAssessment', required: true }, // Reference to EmployeeSkillAssessment model
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, // Reference to Employee who approved or rejected
    approvalStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Approval status
    comments: { type: String }, // Optional comments for the approval
    approvedAt: { type: Date } // Timestamp for when the approval was made
});

// Apply the AutoIncrement plugin to the approvalId field
SkillApprovalSchema.plugin(AutoIncrement, { inc_field: 'approvalId' });

const SkillApproval = mongoose.model("SkillApproval", SkillApprovalSchema);
module.exports = SkillApproval;

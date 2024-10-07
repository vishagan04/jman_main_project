require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const skillRoutes = require("./routes/skillRoutes");
const courseRoutes = require("./routes/courseRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const skillAssessmentRoutes = require("./routes/skillAssessmentRoutes");
const employeeSkillAssessmentRoutes = require("./routes/EmployeeSkillAssessmentRoutes");
const skillApprovalRoutes = require("./routes/skillApprovalRoutes"); // <-- Add this line for SkillApproval

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/skill-assessments", skillAssessmentRoutes);
app.use("/api/employeeSkillAssessment", employeeSkillAssessmentRoutes);
app.use("/api/skill-approval", skillApprovalRoutes); // <-- Add this line for SkillApproval

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

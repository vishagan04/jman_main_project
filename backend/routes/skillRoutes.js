const express = require("express");
const router = express.Router();
const {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill
} = require("../controllers/skillController");

// Get all skills
router.get("/", getSkills);

// Add new skill
router.post("/", addSkill);

// Edit skill by ID
router.put("/:id", updateSkill);

// Delete skill by ID
router.delete("/:id", deleteSkill);

module.exports = router;

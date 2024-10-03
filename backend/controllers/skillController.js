const Skill = require("../models/Skill");

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new skill
exports.addSkill = async (req, res) => {
  const { id, name, description } = req.body;
  const skill = new Skill({ id, name, description });

  try {
    const savedSkill = await skill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    
    try {
      const updatedSkill = await Skill.findOneAndUpdate(
        { id }, // Find by skill ID
        { name, description },
        { new: true } // Return the updated skill
      );
  
      if (!updatedSkill) {
        return res.status(404).json({ message: "Skill not found" });
      }
  
      res.json(updatedSkill);
    } catch (error) {
      res.status(500).json({ message: "Error updating skill" });
    }
  };
  
  // Delete skill
  exports.deleteSkill = async (req, res) => {
    const { id } = req.params;
    
    try {
      const deletedSkill = await Skill.findOneAndDelete({ id });
      
      if (!deletedSkill) {
        return res.status(404).json({ message: "Skill not found" });
      }
  
      res.json({ message: "Skill deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting skill" });
    }
  };

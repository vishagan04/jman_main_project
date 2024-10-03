// models/Skill.js

const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Skill", skillSchema);

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  competencyLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true } // Add competency level
});

module.exports = mongoose.model("Course", courseSchema);

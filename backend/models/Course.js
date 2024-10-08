const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  competencyLevel: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  department: { type: String, required: true },  // New field
  rating: { type: Number, required: true, min: 1, max: 5 },  // New field
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

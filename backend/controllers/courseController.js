const Course = require("../models/Course");

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new course
exports.addCourse = async (req, res) => {
  const { id, name, description } = req.body;
  const course = new Course({ id, name, description });

  try {
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

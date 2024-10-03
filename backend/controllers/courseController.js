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
  const { id, name, description, competencyLevel } = req.body; // Include competencyLevel
  const course = new Course({ id, name, description, competencyLevel }); // Add competencyLevel

  try {
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description, competencyLevel } = req.body; // Include competencyLevel
  
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { id }, 
      { name, description, competencyLevel }, // Add competencyLevel
      { new: true } 
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course" });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedCourse = await Course.findOneAndDelete({ id });
    
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course" });
  }
};

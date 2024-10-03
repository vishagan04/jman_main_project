const express = require("express");
const {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

// Route to get all courses
router.get("/", getCourses);

// Route to add a new course
router.post("/", addCourse);

// Route to update a specific course by ID
router.put("/:id", updateCourse); // Add the update route

// Route to delete a specific course by ID
router.delete("/:id", deleteCourse); // Add the delete route

module.exports = router;

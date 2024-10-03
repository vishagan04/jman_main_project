// routes/admin/employeeRoutes.js

const express = require("express");
const { addEmployee, getEmployees, updateEmployee, deleteEmployee, login } = require("../controllers/employeeController"); // Include updateEmployee and deleteEmployee
const router = express.Router();

// Route to get all employees
router.get("/", getEmployees);

// Route to add a new employee
router.post("/", addEmployee);

// Route to update an existing employee
router.put("/:id", updateEmployee); // :id parameter to specify which employee to update

// Route to delete an employee
router.delete("/:id", deleteEmployee); // :id parameter to specify which employee to delete

// Route for employee login
router.post("/login", login);

module.exports = router;

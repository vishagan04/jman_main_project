// routes/admin/employeeRoutes.js
const express = require("express");
const { addEmployee, getEmployees , login} = require("../controllers/employeeController"); // Updated path
const router = express.Router();

// Route to get all employees
router.get("/", getEmployees);

router.post("/", addEmployee);
// Add more routes like GET, PUT, DELETE...


router.post("/login", login);
module.exports = router;

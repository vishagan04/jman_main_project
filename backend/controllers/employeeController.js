// controllers/admin/employeeController.js
const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {
  const { name,email, role, department, password } = req.body;
  const newEmployee = new Employee({ name, role, department, password });
  
  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find(); // Retrieve all employees from the database
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  };


  exports.login = async (req, res) => {
    const { email, password } = req.body;
    const name = email
    try {
      // Find the employee by email
      const employee = await Employee.findOne({ name });
      if (!employee) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // Check if the password is correct
      if (employee.password !== password) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // You can send back employee details or a token
      res.status(200).json({ id: employee._id, name: employee.name, email: employee.email, role : employee.role });
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  };
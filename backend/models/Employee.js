// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  password: { type: String, required: true },
  // Additional fields...
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;

// authMiddleware.js

const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
  // Get token from request headers
  const token = req.headers['authorization']?.split(' ')[1];

  // If no token is provided, return an unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Attach the employee ID to the request object
    req.employeeId = decoded.id;

    // Find the employee in the database
    try {
      const employee = await Employee.findById(req.employeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }

      // Attach employee data to the request object
      req.employee = employee;


      // Call next middleware or route handler
      next();
    } catch (error) {
      console.error('Error finding employee:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
};

// Middleware to check if the employee is authorized (optional, based on role or permission)
const authorize = (roles = []) => {
  // If roles is not an array, make it an array
  if (typeof roles === 'string') {
    roles = [roles];
  }
  console.log("Tole", role)
  return (req, res, next) => {
    // If roles array is empty, grant access
    if (roles.length && !roles.includes(req.employee.role)) {
      return res.status(403).json({ message: 'Forbidden. You do not have permission to access this resource.' });
    }
    next();
  };
};

module.exports = { authMiddleware, authorize };

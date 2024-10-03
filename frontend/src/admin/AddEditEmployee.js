import React, { useState } from "react";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";

const AddEditEmployee = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", // New email field
    role: "",
    department: "",
    password: "", // Password field for employee
  });

  // Handle changes to the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const addedEmployee = await response.json(); // Parse the response
      console.log("Employee added:", addedEmployee);

      // Call the parent function to refresh the employee list
      onEmployeeAdded(addedEmployee);

      // Reset form data after submission
      setFormData({
        name: "",
        email: "", // Reset email field
        role: "",
        department: "",
        password: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="row">
        <Sidebar />
        <div className="container mt-4 col-md-9">
          <h1 className="mb-4">Add/Edit Employee</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email" // Set type to email for validation
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditEmployee;

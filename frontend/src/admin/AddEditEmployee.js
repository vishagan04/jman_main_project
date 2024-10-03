import React, { useState, useEffect } from "react";

const AddEditEmployee = ({ onEmployeeAdded, employeeToEdit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    password: "",
  });

  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit); // Populate the form with existing employee data for editing
    } else {
      setFormData({
        name: "",
        email: "",
        role: "",
        department: "",
        password: "",
      });
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = employeeToEdit
        ? await fetch(`http://localhost:5000/api/employees/${employeeToEdit._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
        : await fetch("http://localhost:5000/api/employees", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

      if (!response.ok) {
        throw new Error("Failed to add/edit employee");
      }

      const addedOrUpdatedEmployee = await response.json();
      onEmployeeAdded(addedOrUpdatedEmployee);

      // Reset form data after submission
      setFormData({
        name: "",
        email: "",
        role: "",
        department: "",
        password: "",
      });
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding/editing employee:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{employeeToEdit ? "Edit Employee" : "Add Employee"}</h1>
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
            type="email"
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
        <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditEmployee;

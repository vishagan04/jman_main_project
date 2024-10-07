import React, { useEffect, useState } from "react";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";
import { Modal, Button } from "react-bootstrap";
import AddEditEmployee from "./AddEditEmployee"; // Import the AddEditEmployee component

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await response.json();
        setEmployees(fetchedData);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleEmployeeAdded = (employee) => {
    if (isEditing) {
      setEmployees(employees.map(emp => (emp._id === employee._id ? employee : emp))); // Update the edited employee
    } else {
      setEmployees([...employees, employee]); // Add the new employee
    }
    handleCloseModal(); // Close the modal after adding or editing
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEmployees(employees.filter((employee) => employee._id !== id));
      } else {
        console.error("Error deleting employee:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employee-dashboard vh-100 ">
      <Navbar />
      <div className="row m-0 w-100 min-vh-100 z-0">
        <Sidebar />
        <div className="container mt-4 col-md-9">
          <h1 className="mb-4">Employee List</h1>
          <button className="btn btn-primary mb-3" onClick={handleAddEmployee}>
            Add Employee
          </button>
          {loading && <p>Loading employees...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Email</th> {/* Change from ID to Email */}
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.email}</td> {/* Display email instead of ID */}
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>{employee.department}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleViewProfile(employee)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? "Edit Employee" : "Add Employee"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddEditEmployee
                onEmployeeAdded={handleEmployeeAdded}
                employeeToEdit={selectedEmployee}
                onClose={handleCloseModal}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;

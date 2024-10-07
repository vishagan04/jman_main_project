import React, { useEffect, useState } from "react";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";
import { Modal, Button } from "react-bootstrap";
import AddEditEmployee from "./AddEditEmployee"; // Import the AddEditEmployee component

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // State for the employee to delete

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

  const handleDelete = (id) => {
    setEmployeeToDelete(id); // Set the employee ID to delete
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const confirmDeleteEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${employeeToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEmployees(employees.filter((employee) => employee._id !== employeeToDelete));
      } else {
        console.error("Error deleting employee:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setShowDeleteModal(false); // Close the delete confirmation modal
      setEmployeeToDelete(null); // Clear the employee ID
    }
  };

  return (
    <div className="employee-dashboard vh-100 ">
      <Navbar />
      <div className="row m-0 w-100 min-vh-100 z-0">
        <Sidebar />
        <div className="dashboard-content container mt-4 col-9 col-lg-10 z-0" style={{ zIndex: 0 }}>
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
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.email}</td>
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

          {/* Modal for Adding/Editing Employee */}
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

          {/* Modal for Confirming Deletion */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this employee?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDeleteEmployee}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;

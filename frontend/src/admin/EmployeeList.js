import React, { useEffect, useState } from "react";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";
import { Modal, Button } from "react-bootstrap";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Function to fetch employee data
    const fetchEmployees = async () => {
      setLoading(true); // Set loading to true
      try {
        // Make the GET request to fetch employees
        const response = await fetch("http://localhost:5000/api/employees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await response.json(); // Parse JSON response
        setEmployees(fetchedData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError(error.message); // Update error state
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchEmployees(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on component mount

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <Navbar />
      <div className="row">
        <Sidebar />
        <div className="container mt-4 col-md-9">
          <h1 className="mb-4">Employee List</h1>
          {loading && <p>Loading employees...</p>} {/* Loading message */}
          {error && <p className="text-danger">{error}</p>} {/* Error message */}
          {!loading && !error && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee._id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>{employee.department}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewProfile(employee)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Employee Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedEmployee ? (
                <div>
                  <h5>Name: {selectedEmployee.name}</h5>
                  <p>Role: {selectedEmployee.role}</p>
                  <p>Department: {selectedEmployee.department}</p>
                </div>
              ) : (
                <p>No employee selected.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;

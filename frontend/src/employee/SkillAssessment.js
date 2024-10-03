import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";
import { Button, Modal, Table } from "react-bootstrap";
import SkillAssessmentForm from "./components/SkillAssessmentForm";

const SkillAssessment = ({ employeeId }) => { // Accept employeeId as a prop
  const [assessments, setAssessments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false); // Modal for adding new assessment

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/assessments");
        const data = await response.json();
        setAssessments(data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };

    fetchAssessments();
  }, []);

  const handleTakeAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAssessment(null);
  };

  const handleAddAssessmentSubmit = (newAssessment) => {
    setAssessments([...assessments, newAssessment]); // Update the table immediately
    setShowAddModal(false);
  };

  return (
    <div>
      <EmployeeNavbar />
      <div className="row">
        <EmployeeSidebar />
        <div className="container mt-4 col-md-9">
          <h1 className="mb-4">Skill Assessment</h1>

          {/* Add New Assessment Button */}
          <Button
            variant="success"
            className="mb-4"
            onClick={() => setShowAddModal(true)}
          >
            Add New Assessment
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course</th>
                <th>Skill</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td>{assessment.course}</td>
                  <td>{assessment.skill}</td>
                  <td>{assessment.score}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleTakeAssessment(assessment)}
                    >
                      Take Assessment
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for Taking Assessment */}
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{currentAssessment?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{currentAssessment?.description}</p>
              <SkillAssessmentForm
                assessmentId={currentAssessment?.id}
                employeeId={employeeId} // Pass employeeId to the form
                onSubmit={handleAddAssessmentSubmit}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal for Adding New Assessment */}
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add New Assessment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SkillAssessmentForm
                assessmentId={null} // Assuming new assessments will have a null or new id
                employeeId={employeeId} // Pass employeeId to the form
                onSubmit={handleAddAssessmentSubmit}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;

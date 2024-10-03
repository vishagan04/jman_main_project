
import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";
import { Button, Modal, Table } from "react-bootstrap";
import SkillAssessmentForm from "./components/SkillAssessmentForm";




const SkillAssessment = ({  }) => {
  const [assessments, setAssessments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  let employeeId = false

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:5000/api/employeeSkillAssessment/${employeeId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assessments');
        }

        const data = await response.json();
        setAssessments(data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };

    const employeeId = JSON.parse(localStorage.getItem('employee')).id // Fetch assessments only when employeeId is available
    if (employeeId) {
      fetchAssessments();
    }
  }, [employeeId]);

  const handleTakeAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAssessment(null);
  };

  const handleAddAssessmentSubmit = async (newAssessment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newAssessment),
      });

      if (!response.ok) {
        throw new Error("Failed to submit assessment");
      }

      const savedAssessment = await response.json();
      setAssessments([...assessments, savedAssessment]); // Add the new assessment to the state
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding assessment:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <EmployeeNavbar />

      <div className="row">
        {/* Sidebar */}
        <EmployeeSidebar />

        {/* Main Content */}
        <div className="container mt-4 col-md-9">
          <h1 className="mb-4">Skill Assessment</h1>

          {/* Add Assessment Button */}
          <Button
            variant="success"
            className="mb-4"
            onClick={() => setShowAddModal(true)}
          >
            Add New Assessment
          </Button>

          {/* Assessments Table */}
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
                  <td>{assessment.certification}</td> {/* Changed course to certification */}
                  <td>{assessment.skills}</td> {/* Changed skill to skills */}
                  <td>{assessment.marks}</td> {/* Changed score to marks */}
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
                employeeId={employeeId}
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
                assessmentId={null}
                employeeId={employeeId}
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

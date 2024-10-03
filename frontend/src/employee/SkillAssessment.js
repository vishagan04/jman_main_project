import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";
import { Button, Modal, Table } from "react-bootstrap";
import SkillAssessmentForm from "./components/SkillAssessmentForm";

const SkillAssessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [certificationOptions, setCertificationOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const employeeId = JSON.parse(localStorage.getItem("employee")).id; // Get employeeId from localStorage

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/employeeSkillAssessment/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch assessments");
        }

        const data = await response.json();
        setAssessments(data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };

    const fetchOptions = async () => {
      try {
        // Fetch certifications
        const certResponse = await fetch("http://localhost:5000/api/courses");
        const certData = await certResponse.json();
        setCertificationOptions(certData);

        // Fetch skills
        const skillResponse = await fetch("http://localhost:5000/api/skills");
        const skillData = await skillResponse.json();
        setSkillOptions(skillData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchAssessments();
    fetchOptions();
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
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/employeeSkillAssessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAssessment),
      });

      if (!response.ok) {
        throw new Error("Failed to submit assessment");
      }

      const savedAssessment = await response.json();
      setAssessments((prev) => [...prev, savedAssessment]); // Add the new assessment to the state
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding assessment:", error);
    }
  };

  const handleEditAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setShowModal(true);
  };

  const handleUpdateAssessment = async (updatedAssessment) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/employeeSkillAssessment/${updatedAssessment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAssessment),
      });

      if (!response.ok) {
        throw new Error("Failed to update assessment");
      }

      const data = await response.json();
      setAssessments((prev) =>
        prev.map((assessment) => (assessment._id === data._id ? data : assessment))
      ); // Update the assessment in the state
      setShowModal(false);
    } catch (error) {
      console.error("Error updating assessment:", error);
    }
  };

  const handleDeleteAssessment = async (assessmentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/employeeSkillAssessment/${assessmentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete assessment");
      }

      // Filter out the deleted assessment
      setAssessments((prev) => prev.filter((assessment) => assessment._id !== assessmentId));
    } catch (error) {
      console.error("Error deleting assessment:", error);
    }
  };

  // Function to get the name of the course and skill from their respective options
  const getCertificationName = (id) => {
    const certification = certificationOptions.find(cert => cert._id === id);
    return certification ? certification.name : "Unknown Certification";
  };

  const getSkillName = (id) => {
    const skill = skillOptions.find(skill => skill._id === id);
    return skill ? skill.name : "Unknown Skill";
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
                <tr key={assessment._id}>
                  <td>{getCertificationName(assessment.certification)}</td>
                  <td>{getSkillName(assessment.skills)}</td>
                  <td>{assessment.marks}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEditAssessment(assessment)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteAssessment(assessment._id)}
                      className="ml-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for Taking or Editing Assessment */}
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{currentAssessment?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{currentAssessment?.description}</p>
              <SkillAssessmentForm
                assessmentId={currentAssessment?._id}
                employeeId={employeeId}
                onSubmit={handleUpdateAssessment} // Update the function here
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

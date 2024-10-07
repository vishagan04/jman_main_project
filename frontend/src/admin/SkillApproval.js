import React, { useEffect, useState } from "react";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";
import { Modal, Button, Table } from "react-bootstrap";

const SkillApproval = () => {
    const [assessments, setAssessments] = useState([]);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [currentAssessmentId, setCurrentAssessmentId] = useState(null);
    const [approvalStatus, setApprovalStatus] = useState("");

    // Fetch skill assessments for approval
    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/employeeSkillAssessment");
                const data = await response.json();
                console.log("Fetched assessments:", data);
                setAssessments(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching assessments:", error);
            }
        };
        
        fetchAssessments();
    }, []);

    const handleApprovalClick = (assessmentId) => {
        setCurrentAssessmentId(assessmentId);
        setShowApprovalModal(true);
    };

    const handleApprovalStatusChange = (status) => {
        setApprovalStatus(status);
    };

    const handleSubmitApproval = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/skill-approval/${currentAssessmentId}/approval`, 
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ approvalStatus }),
                }
            );

            if (response.ok) {
                const updatedAssessment = await response.json();
                setAssessments((prev) =>
                    prev.map((assessment) =>
                        assessment._id === currentAssessmentId ? updatedAssessment : assessment
                    )
                );
                handleCloseModal(); // Close modal after submission
            } else {
                console.error("Error updating approval status:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating approval status:", error);
        }
    };

    const handleCloseModal = () => {
        setShowApprovalModal(false);
        setCurrentAssessmentId(null);
        setApprovalStatus("");
    };

    return (
        <div className="employee-dashboard vh-100">
            <Navbar />
            <div className="row m-0 w-100 min-vh-100 z-0">
                <Sidebar />
                <div className="dashboard-content container mt-4 col-9 col-lg-10 z-0">
                    <h1 className="mb-4">Skill Approval Management</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Assessment ID</th>
                                <th>Employee Name</th>
                                <th>Skill</th>
                                <th>Score</th>
                                <th>Approval Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assessments.length > 0 ? (
                                assessments.map((assessment) => (
                                    <tr key={assessment._id}>
                                        <td>{assessment._id}</td>
                                        <td>{assessment.employeeId?.name || "Unknown Employee"}</td>
                                        <td>{assessment.skills || "Unknown Skill"}</td>
                                        <td>{assessment.marks}</td>
                                        <td>{assessment.approvalStatus || "Pending"}</td>
                                        <td>
                                            <Button
                                                className="btn btn-success me-2"
                                                onClick={() => {
                                                    handleApprovalClick(assessment._id);
                                                    handleApprovalStatusChange("Approved"); // Set status to Approved
                                                }}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    handleApprovalClick(assessment._id);
                                                    handleApprovalStatusChange("Rejected"); // Set status to Rejected
                                                }}
                                            >
                                                Reject
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No assessments available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* Modal for Approval */}
                    <Modal show={showApprovalModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Approval Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Set Approval Status: {approvalStatus}</h5>
                            <p>Are you sure you want to {approvalStatus.toLowerCase()} this assessment?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmitApproval}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default SkillApproval;

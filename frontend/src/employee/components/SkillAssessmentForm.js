import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

const SkillAssessmentForm = ({ assessmentId, employeeId, onSubmit }) => {
  const [course, setCourse] = useState("");
  const [skill, setSkill] = useState("");
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure the score is a number and within the valid range
    if (!score || isNaN(score) || score < 0 || score > 100) {
      alert("Please enter a valid score between 0 and 100.");
      return;
    }
    const assessmentData = {
      employeeId:1, // Include employee ID in the data
      course,
      skill,
      score: Number(score), // Ensure score is numeric
    };

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/employee-skill-assessments`, 
        {
          method: "POST", // Use POST for submitting assessments
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assessmentData),
        }
      );

      if (response.ok) {
        const newAssessment = await response.json();
        onSubmit(newAssessment); // Pass new assessment data to parent component
        setCourse(""); // Clear form fields
        setSkill("");
        setScore("");
        alert("Assessment submitted successfully!");
      } else {
        alert("Failed to submit assessment.");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Error submitting assessment.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <Col md={6}>
          <Form.Group controlId="formCourse">
            <Form.Label>Course Completed</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course name"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="form-control"
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="formSkill">
            <Form.Label>Skill Obtained</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter skill name"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="form-control"
              required
            />
          </Form.Group>
        </Col>
      </div>

      <Form.Group controlId="formScore" className="mb-3">
        <Form.Label>Score</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter score (0-100)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="form-control"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? "Submitting..." : "Submit Assessment"}
        </Button>
      </div>
    </Form>
  );
};

export default SkillAssessmentForm;

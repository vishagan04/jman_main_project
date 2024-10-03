import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SkillAssessmentForm = ({ employeeId, onSubmit }) => {
  const [certification, setCertification] = useState('');
  const [skills, setSkills] = useState('');
  const [marks, setMarks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logging for debugging
    console.log("Certification:", certification);
    console.log("Skills:", skills);
    console.log("Marks:", marks);

    // Validate marks
    if (!marks || isNaN(marks) || marks < 0 || marks > 100) {
      alert("Please enter a valid score between 0 and 100.");
      return;
    }

    const assessmentData = {
      employeeId,
      certification,
      skills,
      marks: Number(marks),
    };

    try {
      const response = await fetch('http://localhost:5000/api/employeeSkillAssessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add the token to the Authorization header
        },
        body: JSON.stringify(assessmentData),
      });

      if (response.ok) {
        const newAssessment = await response.json();
        onSubmit(newAssessment); // Call the onSubmit prop to update the parent component
        // Clear form fields
        setCertification(""); 
        setSkills("");
        setMarks("");
        alert("Assessment submitted successfully!");
      } else {
        alert("Failed to submit assessment.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the assessment.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certification">
        <Form.Label>Certification</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter certification name"
          value={certification}
          onChange={(e) => setCertification(e.target.value)}
          required // This indicates the field is required
        />
      </Form.Group>

      <Form.Group controlId="skills">
        <Form.Label>Skills Obtained</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter skills obtained"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required // This indicates the field is required
        />
      </Form.Group>

      <Form.Group controlId="marks">
        <Form.Label>Marks (0-100)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter marks (0-100)"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required // This indicates the field is required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit Assessment
      </Button>
    </Form>
  );
};

export default SkillAssessmentForm;

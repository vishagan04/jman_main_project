import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const SkillAssessmentForm = ({ employeeId, onSubmit }) => {
  const [certification, setCertification] = useState('');
  const [skills, setSkills] = useState('');
  const [marks, setMarks] = useState('');
  const [certificationOptions, setCertificationOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);

  useEffect(() => {
    // Fetch certifications from the API
    const fetchCertifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses'); // Update to your certifications API endpoint
        const data = await response.json();
        setCertificationOptions(data); // Assuming data is an array of certifications
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    // Fetch skills from the API
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/skills'); // Update to your skills API endpoint
        const data = await response.json();
        setSkillOptions(data); // Assuming data is an array of skills
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    // Call both fetch functions
    fetchCertifications();
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate marks input
    if (!marks || isNaN(marks) || marks < 0 || marks > 100) {
      alert("Please enter a valid score between 0 and 100.");
      return;
    }

    // Prepare data to submit
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
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token for authentication
        },
        body: JSON.stringify(assessmentData),
      });

      if (response.ok) {
        const newAssessment = await response.json();
        onSubmit(newAssessment); // Call the onSubmit prop to update the parent component
        // Clear form fields after successful submission
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
        <Form.Select
          value={certification}
          onChange={(e) => setCertification(e.target.value)}
          required
        >
          <option value="">Select Certification</option>
          {certificationOptions.map((cert) => (
            <option key={cert._id} value={cert._id}>{cert.name}</option> // Use _id if that's the ID field in your model
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="skills">
        <Form.Label>Skills Obtained</Form.Label>
        <Form.Select
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        >
          <option value="">Select Skill</option>
          {skillOptions.map((skill) => (
            <option key={skill._id} value={skill._id}>{skill.name}</option> // Use _id if that's the ID field in your model
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="marks">
        <Form.Label>Marks (0-100)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter marks (0-100)"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit Assessment
      </Button>
    </Form>
  );
};

export default SkillAssessmentForm;

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Container, Spinner } from 'react-bootstrap';
import './SkillAssessmentForm.css'; // Import custom styles

const SkillAssessmentForm = ({ employeeId, onSubmit }) => {
  const [certification, setCertification] = useState('');
  const [skills, setSkills] = useState('');
  const [marks, setMarks] = useState('');
  const [certificationOptions, setCertificationOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();
        setCertificationOptions(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/skills');
        const data = await response.json();
        setSkillOptions(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchCertifications();
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate marks input
    if (!marks || isNaN(marks) || marks < 0 || marks > 100) {
      setError("Please enter a valid score between 0 and 100.");
      return;
    }

    const assessmentData = {
      employeeId,
      certification,
      skills,
      marks: Number(marks),
    };

    setLoading(true); // Set loading to true before API call

    try {
      const response = await fetch('http://localhost:5000/api/employeeSkillAssessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
        setSuccess("Assessment submitted successfully!");
        setError('');
      } else if (response.status === 400) {
        setError("Assessment already taken.");
        setSuccess('');
      } else {
        setError("Failed to submit assessment.");
        setSuccess('');
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while submitting the assessment.");
      setSuccess('');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center text-primary mb-4">Skill Assessment Form</Card.Title>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="certification">
              <Form.Label className="font-weight-bold">Certification</Form.Label>
              <Form.Select
                value={certification}
                onChange={(e) => setCertification(e.target.value)}
                required
                className="mb-3"
              >
                <option value="">Select Certification</option>
                {certificationOptions.map((cert) => (
                  <option key={cert._id} value={cert._id}>{cert.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="skills">
              <Form.Label className="font-weight-bold">Skills Obtained</Form.Label>
              <Form.Select
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
                className="mb-3"
              >
                <option value="">Select Skill</option>
                {skillOptions.map((skill) => (
                  <option key={skill._id} value={skill._id}>{skill.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="marks">
              <Form.Label className="font-weight-bold">Score (0-100)</Form.Label>
              <Form.Control
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
                className="mb-3"
                placeholder="Enter your score"
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Submit'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SkillAssessmentForm;

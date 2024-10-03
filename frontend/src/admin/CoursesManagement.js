// CoursesManagement.js

import React, { useEffect, useState } from "react";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";
import { Modal, Button } from "react-bootstrap";

const CoursesManagement = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    // Fetch courses from the API
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses"); // Adjust the API endpoint as needed
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
    };

    try {
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        const addedCourse = await response.json();
        setCourses([...courses, addedCourse]); // Update courses state with the new course
        setFormData({ id: "", name: "", description: "" });
        setShowModal(false);
      } else {
        console.error("Error adding course:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: "", name: "", description: "" });
  };

  return (
    <div>
      <Navbar />
      <div className="row">
        <Sidebar />
        <div className="container mt-4 col-md-9">
          <h1 className="mb-4">Courses Management</h1>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowModal(true)}
          >
            Add Course
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Adding Course */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Course ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" variant="primary">
                  Add Course
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CoursesManagement;

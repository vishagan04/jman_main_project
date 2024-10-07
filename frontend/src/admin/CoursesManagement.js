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
    competencyLevel: "beginner", // Default value
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);

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
      competencyLevel: formData.competencyLevel, // Include competency level
    };

    if (isEditing) {
      // Update course if we are editing
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${currentCourseId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCourse),
        });

        if (response.ok) {
          const updatedCourse = await response.json();
          setCourses(
            courses.map((course) =>
              course.id === currentCourseId ? updatedCourse : course
            )
          );
          setIsEditing(false);
          setFormData({ id: "", name: "", description: "", competencyLevel: "beginner" });
          setShowModal(false);
        } else {
          console.error("Error updating course:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating course:", error);
      }
    } else {
      // Add new course if we are not editing
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
          setCourses([...courses, addedCourse]);
          setFormData({ id: "", name: "", description: "", competencyLevel: "beginner" });
          setShowModal(false);
        } else {
          console.error("Error adding course:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding course:", error);
      }
    }
  };

  const handleEdit = (course) => {
    setFormData({ id: course.id, name: course.name, description: course.description, competencyLevel: course.competencyLevel });
    setCurrentCourseId(course.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCourses(courses.filter((course) => course.id !== id));
      } else {
        console.error("Error deleting course:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({ id: "", name: "", description: "", competencyLevel: "beginner" });
  };

  return (
    <div className="employee-dashboard vh-100 ">
    <Navbar />
    <div className="row m-0 w-100 min-vh-100 z-0" style={{
      // minHeight:"calc(100vh-7rem)",
      
    }}>
      <Sidebar />
        <div className="container mt-4 col-md-9">
          <h1 className="mb-4">Courses Management</h1>
          <button
            className="btn btn-primary mb-3"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setFormData({ id: "", name: "", description: "", competencyLevel: "beginner" }); // Reset form for adding new course
            }}
          >
            Add Course
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Competency Level</th> {/* Add Competency Level column */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>{course.competencyLevel}</td> {/* Display Competency Level */}
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Adding/Editing Course */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? "Edit Course" : "Add New Course"}</Modal.Title>
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
                <div className="mb-3">
                  <label className="form-label">Competency Level</label>
                  <select
                    className="form-select"
                    name="competencyLevel"
                    value={formData.competencyLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <Button variant="primary" type="submit">
                  {isEditing ? "Update Course" : "Add Course"}
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

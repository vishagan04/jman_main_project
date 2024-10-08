import React, { useEffect, useState } from "react";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  

const CoursesManagement = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    competencyLevel: "beginner", 
    department: "", // New field
    rating: "", // New field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Error fetching courses!"); 
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
      competencyLevel: formData.competencyLevel,
      department: formData.department, // Include department
      rating: formData.rating, // Include rating
    };

    if (isEditing) {
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
          toast.success("Course updated successfully!");
          setIsEditing(false);
          setFormData({ id: "", name: "", description: "", competencyLevel: "beginner", department: "", rating: "" });
          setShowModal(false);
        } else {
          console.error("Error updating course:", response.statusText);
          toast.error("Failed to update course!");
        }
      } catch (error) {
        console.error("Error updating course:", error);
        toast.error("Error updating course!");
      }
    } else {
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
          toast.success("Course added successfully!");
          setFormData({ id: "", name: "", description: "", competencyLevel: "beginner", department: "", rating: "" });
          setShowModal(false);
        } else {
          console.error("Error adding course:", response.statusText);
          toast.error("Failed to add course!");
        }
      } catch (error) {
        console.error("Error adding course:", error);
        toast.error("Error adding course!");
      }
    }
  };

  const handleEdit = (course) => {
    setFormData({ 
      id: course.id, 
      name: course.name, 
      description: course.description, 
      competencyLevel: course.competencyLevel,
      department: course.department, // Include department
      rating: course.rating // Include rating
    });
    setCurrentCourseId(course.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setConfirmDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteCourse = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${confirmDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCourses(courses.filter((course) => course.id !== confirmDelete));
        toast.success("Course deleted successfully!");
      } else {
        console.error("Error deleting course:", response.statusText);
        toast.error("Failed to delete course!");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Error deleting course!");
    } finally {
      setConfirmDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({ id: "", name: "", description: "", competencyLevel: "beginner", department: "", rating: "" });
    setConfirmDelete(null);
  };

  return (
    <div className="employee-dashboard vh-100">
      <Navbar />
      <div className="row m-0 w-100 min-vh-100 z-0">
        <Sidebar />
        <div className="dashboard-content container mt-4 col-9 col-lg-10 z-0">
          <ToastContainer />
          <h1 className="mb-4">Courses Management</h1>
          <button
            className="btn btn-primary mb-3"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setFormData({ id: "", name: "", description: "", competencyLevel: "beginner", department: "", rating: "" });
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
                <th>Competency Level</th>
                <th>Department</th> {/* New column */}
                <th>Rating</th> {/* New column */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>{course.competencyLevel}</td>
                  <td>{course.department}</td> {/* Display department */}
                  <td>{course.rating}</td> {/* Display rating */}
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
                <div className="mb-3">
                  <label className="form-label">Department</label> {/* New field */}
                  <input
                    type="text"
                    className="form-control"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating</label> {/* New field */}
                  <input
                    type="number"
                    className="form-control"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    required
                  />
                </div>
                <Button type="submit" variant="primary">
                  {isEditing ? "Update Course" : "Add Course"}
                </Button>
              </form>
            </Modal.Body>
          </Modal>

          {/* Modal for Deleting Course */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDeleteCourse}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CoursesManagement;

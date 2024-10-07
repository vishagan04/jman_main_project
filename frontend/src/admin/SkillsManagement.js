import React, { useEffect, useState } from "react";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";
import { Modal, Button } from "react-bootstrap";

const SkillsManagement = () => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkillId, setCurrentSkillId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // Store ID of skill to delete

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/skills");
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSkill = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
    };

    if (isEditing) {
      try {
        const response = await fetch(`http://localhost:5000/api/skills/${currentSkillId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSkill),
        });

        if (response.ok) {
          const updatedSkill = await response.json();
          setSkills(
            skills.map((skill) =>
              skill.id === currentSkillId ? updatedSkill : skill
            )
          );
          setIsEditing(false);
          setFormData({ id: "", name: "", description: "" });
          setShowModal(false);
        } else {
          console.error("Error updating skill:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating skill:", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/skills", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSkill),
        });

        if (response.ok) {
          const addedSkill = await response.json();
          setSkills([...skills, addedSkill]);
          setFormData({ id: "", name: "", description: "" });
          setShowModal(false);
        } else {
          console.error("Error adding skill:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding skill:", error);
      }
    }
  };

  const handleEdit = (skill) => {
    setFormData({ id: skill.id, name: skill.name, description: skill.description });
    setCurrentSkillId(skill.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setConfirmDelete(id); // Set the skill ID to confirm deletion
    setShowDeleteModal(true); // Show the confirmation modal for deletion
  };

  const confirmDeleteSkill = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/skills/${confirmDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSkills(skills.filter((skill) => skill.id !== confirmDelete));
      } else {
        console.error("Error deleting skill:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    } finally {
      setConfirmDelete(null); // Reset confirmation
      setShowDeleteModal(false); // Close delete modal
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({ id: "", name: "", description: "" });
  };

  return (
    <div className="employee-dashboard vh-100">
      <Navbar />
      <div className="row m-0 w-100 min-vh-100 z-0">
        <Sidebar />
        <div className="dashboard-content container mt-4 col-9 col-lg-10 z-0">
          <h1 className="mb-4">Skills Management</h1>
          <button
            className="btn btn-primary mb-3"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setFormData({ id: "", name: "", description: "" }); // Reset form for adding new skill
            }}
          >
            Add Skill
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Skill ID</th>
                <th>Skill Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.id}</td>
                  <td>{skill.name}</td>
                  <td>{skill.description}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(skill)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(skill.id)} // Call handleDelete
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Adding/Editing Skill */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? "Edit Skill" : "Add New Skill"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Skill ID</label>
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
                  <label className="form-label">Skill Name</label>
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
                <Button variant="primary" type="submit">
                  {isEditing ? "Update Skill" : "Add Skill"}
                </Button>
              </form>
            </Modal.Body>
          </Modal>

          {/* Confirmation Modal for Deleting Skill */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this skill?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDeleteSkill}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SkillsManagement;

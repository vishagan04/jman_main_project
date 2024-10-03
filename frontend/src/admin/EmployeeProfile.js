import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeProfile = () => {
  const { id } = useParams(); // Get the employee id from the route
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employee/${id}`); // API from Express backend
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
        toast.error("Failed to fetch employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Employee Details: {data.name}</h1>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Personal Information</h5>
                <p className="card-text">
                  <strong>ID:</strong> {data._id}
                </p>
                <p className="card-text">
                  <strong>Name:</strong> {data.name}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {data.email}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {data.phone}
                </p>
                <p className="card-text">
                  <strong>Role:</strong> {data.role}
                </p>

                <h5 className="card-title mt-4">Skills & Certifications</h5>
                <p className="card-text">
                  <strong>Skills:</strong> {data.skills.join(", ")}
                </p>
                <p className="card-text">
                  <strong>Certifications:</strong> {data.certifications.join(", ")}
                </p>

                <h5 className="card-title mt-4">Completed Courses</h5>
                <ul className="list-group">
                  {data.courses.map((course) => (
                    <li className="list-group-item" key={course._id}>
                      {course.name} - Completed on {new Date(course.completionDate).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeProfile;

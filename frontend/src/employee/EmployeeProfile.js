import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";

const EmployeeProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const employeeId = JSON.parse(localStorage.getItem("employee")).id;

        // Fetch employee profile details
        const profileResponse = await fetch(`http://localhost:5000/api/employeeProfile/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const profileData = await profileResponse.json();
        setProfileData(profileData);

        // Fetch employee skills
        const skillsResponse = await fetch(`http://localhost:5000/api/employeeSkills/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!skillsResponse.ok) {
          throw new Error("Failed to fetch skills");
        }

        const skillsData = await skillsResponse.json();
        setSkills(skillsData);

        // Fetch certifications
        const certResponse = await fetch(`http://localhost:5000/api/certifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const certData = await certResponse.json();
        setCertifications(certData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <EmployeeNavbar />
      <div className="row">
        <EmployeeSidebar />
        <div className="container mt-4 col-md-9">
          <h2 className="mb-4">Employee Profile</h2>

          {profileData ? (
            <div>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Personal Information</h5>
                  <p><strong>Name:</strong> {profileData.name}</p>
                  <p><strong>Email:</strong> {profileData.email}</p>
                  <p><strong>Department:</strong> {profileData.department}</p>
                  <p><strong>Role:</strong> {profileData.role}</p>
                </div>
              </div>

              {/* Skills Section */}
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Skills</h5>
                  {skills.length > 0 ? (
                    <ul>
                      {skills.map(skill => (
                        <li key={skill._id}>{skill.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No skills available</p>
                  )}
                </div>
              </div>

              {/* Certifications Section */}
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Certifications</h5>
                  {certifications.length > 0 ? (
                    <ul>
                      {certifications.map(cert => (
                        <li key={cert._id}>{cert.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No certifications available</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading profile data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

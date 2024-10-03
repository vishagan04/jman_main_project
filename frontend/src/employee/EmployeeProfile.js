import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null); // State to hold employee data

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees/1"); // Replace with appropriate API endpoint
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <div>
      <EmployeeNavbar />
      <div className="row">
        <EmployeeSidebar />
        <div className="container mt-4 col-md-9">
          <h1 className="mb-4">Employee Profile</h1>
          {employeeData ? (
            <div className="card shadow-sm p-4">
              <div className="d-flex align-items-center">
                <img 
                  src={employeeData.profilePicture || "default-profile-pic.png"} // Placeholder image
                  alt={`${employeeData.name}'s Profile`}
                  className="rounded-circle"
                  style={{ width: '100px', height: '100px', marginRight: '20px' }} 
                />
                <div>
                  <h3>{employeeData.name}</h3>
                  <p><strong>Email:</strong> {employeeData.email}</p>
                  <p><strong>Position:</strong> {employeeData.position}</p>
                </div>
              </div>
              <hr />
              <h4>Skills</h4>
              <ul>
                {employeeData.skills.map((skill) => (
                  <li key={skill.id}>
                    <strong>{skill.name}</strong>: {skill.description}
                  </li>
                ))}
              </ul>
              <h4>Certifications</h4>
              <ul>
                {employeeData.certifications.map((cert) => (
                  <li key={cert.id}>{cert.name}</li>
                ))}
              </ul>
              {employeeData.experience && (
                <>
                  <h4>Experience</h4>
                  <ul>
                    {employeeData.experience.map((exp) => (
                      <li key={exp.id}>
                        <strong>{exp.jobTitle}</strong> at {exp.company} ({exp.startDate} - {exp.endDate})
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {employeeData.achievements && (
                <>
                  <h4>Achievements</h4>
                  <ul>
                    {employeeData.achievements.map((achievement) => (
                      <li key={achievement.id}>{achievement.description}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ) : (
            <p>Loading employee data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";
import Img from "../assets/avathar.png"; // Import the default avatar image

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null); // Start with null
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if data is already fetched

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("employee"));
  
  // Fallback values in case the data is not available
  const employeeName = userData ? userData.name : "Unknown User";
  const employeeEmail = userData ? userData.email : "Email not present";
  const employeeRole = userData ? userData.role : "Role not defined";
  const token = userData ? userData.token : null; // Assuming token is in employee object

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (userData && !isDataFetched) { // Check if user data exists and if data is not already fetched
        try {
          const employeeId = userData.id; // Get employee ID from localStorage

          const response = await fetch(`http://localhost:5000/api/employeeSkillAssessment/${employeeId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token for authentication
            },
          });
          
          if (!response.ok) {
            throw new Error("Failed to fetch employee data");
          }

          const data = await response.json();
          setEmployeeData(data);
          setIsDataFetched(true); // Set data fetched to true after successful fetch
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      }
    };

    fetchEmployeeData();
  }, [userData, token, isDataFetched]); // Dependencies array includes userData and token

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
                  src={employeeData.profilePicture || Img} // Use the imported image if no profile picture
                  alt={`${employeeName}'s Profile`}
                  className="rounded-circle"
                  style={{ width: '100px', height: '100px', marginRight: '20px' }} 
                />
                <div>
                  <h3>{employeeName}</h3>
                  <p><strong>Email:</strong> {employeeEmail}</p>
                  <p><strong>Role:</strong> {employeeRole}</p>
                </div>
              </div>
              <hr />
              <h4>Skills</h4>
              <ul>
                {Array.isArray(employeeData.skills) && employeeData.skills.length > 0 ? (
                  employeeData.skills.map((skill) => (
                    <li key={skill.id}>
                      <strong>{skill.name}</strong>: {skill.description} {/* Display skill name and description */}
                    </li>
                  ))
                ) : (
                  <li>No skills available</li>
                )}
              </ul>
              <h4>Certifications</h4>
              <ul>
                {Array.isArray(employeeData.certifications) && employeeData.certifications.length > 0 ? (
                  employeeData.certifications.map((cert) => (
                    <li key={cert.id}>{cert.name}</li>
                  ))
                ) : (
                  <li>No certifications available</li>
                )}
              </ul>
              {Array.isArray(employeeData.experience) && employeeData.experience.length > 0 && (
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
              {Array.isArray(employeeData.achievements) && employeeData.achievements.length > 0 && (
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

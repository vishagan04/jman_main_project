import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";
import Img from "../assets/avathar.png"; // Import the default avatar image

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [skillsOptions, setSkillsOptions] = useState([]); // State to store skill options
  const [certificationOptions, setCertificationOptions] = useState([]); // State to store certification options

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("employee"));
  const employeeName = userData ? userData.name : "Unknown User";
  const employeeEmail = userData ? userData.email : "Email not present";
  const employeeRole = userData ? userData.role : "Role not defined";
  const token = userData ? userData.token : null;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (userData && !isDataFetched) {
        try {
          const employeeId = userData.id;
          const response = await fetch(
            `http://localhost:5000/api/employeeSkillAssessment/${employeeId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch employee data");
          }

          const data = await response.json();

          // Fetch skills and certifications
          const skillResponse = await fetch("http://localhost:5000/api/skills");
          const skills = await skillResponse.json();
          setSkillsOptions(skills); // Save skills options

          const certResponse = await fetch(
            "http://localhost:5000/api/courses"
          );
          const certifications = await certResponse.json();
          setCertificationOptions(certifications); // Save certification options

          // Combine fetched data
          const skillsData = data.map((assessment) => assessment.skills);
          const certificationsData = data.map(
            (assessment) => assessment.certification
          );

          setEmployeeData({
            skills: skillsData,
            certifications: certificationsData,
          });

          setIsDataFetched(true);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      }
    };

    fetchEmployeeData();
  }, [userData, token, isDataFetched]);

  // Get the certification name from the certification ID
  const getCertificationName = (id) => {
    const certification = certificationOptions.find((cert) => cert._id === id);
    return certification ? certification.name : "Unknown Certification";
  };

  // Get the skill name from the skill ID
  const getSkillName = (id) => {
    const skill = skillsOptions.find((skill) => skill._id === id);
    return skill ? skill.name : "Unknown Skill";
  };

  return (
    <div className="employee-dashboard vh-100">
      <EmployeeNavbar />
      <div
        className="row m-0 w-100 min-vh-100 z-0"
        style={{
          paddingTop: "95px",
        }}
      >
        <EmployeeSidebar />
        <div
          className="dashboard-content container mt-4 col-9 col-lg-10 z-0"
          style={{ zIndex: 0 }}
        >
          <h1 className="mb-4">Employee Profile</h1>
          {employeeData ? (
            <div className="card shadow-sm p-4">
              <div className="d-flex align-items-center">
                <img
                  src={employeeData.profilePicture || Img}
                  alt={`${employeeName}'s Profile`}
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px", marginRight: "20px" }}
                />
                <div>
                  <h3>{employeeName}</h3>
                  <p>
                    <strong>Email:</strong> {employeeEmail}
                  </p>
                  <p>
                    <strong>Role:</strong> {employeeRole}
                  </p>
                </div>
              </div>
              <hr />
              <h4>Skills</h4>
              <ul>
                {Array.isArray(employeeData.skills) && employeeData.skills.length > 0 ? (
                  employeeData.skills.map((skillId, index) => (
                    <li key={index}>
                      <strong>{getSkillName(skillId)}</strong>
                    </li>
                  ))
                ) : (
                  <li>No skills available</li>
                )}
              </ul>
              <h4>Certifications</h4>
              <ul>
                {Array.isArray(employeeData.certifications) &&
                employeeData.certifications.length > 0 ? (
                  employeeData.certifications.map((certId, index) => (
                    <li key={index}>{getCertificationName(certId)}</li>
                  ))
                ) : (
                  <li>No certifications available</li>
                )}
              </ul>
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

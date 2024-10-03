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
            <>
              <h3>{employeeData.name}</h3>
              <p><strong>Email:</strong> {employeeData.email}</p>
              <p><strong>Position:</strong> {employeeData.position}</p>
              <h4>Skills</h4>
              <ul>
                {employeeData.skills.map((skill) => (
                  <li key={skill.id}>{skill.name}: {skill.description}</li>
                ))}
              </ul>
              <h4>Certifications</h4>
              <ul>
                {employeeData.certifications.map((cert) => (
                  <li key={cert.id}>{cert.name}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading employee data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

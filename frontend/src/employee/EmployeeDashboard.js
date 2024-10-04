import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";
import Chart from "react-apexcharts";

const EmployeeDashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [assessments, setAssessments] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [marksBarChartOptions, setMarksBarChartOptions] = useState({});
  const [marksBarChartSeries, setMarksBarChartSeries] = useState([]);
  const [marksPieChartOptions, setMarksPieChartOptions] = useState({});
  const [marksPieChartSeries, setMarksPieChartSeries] = useState([]);
  const [skillCounts, setSkillCounts] = useState({});
  const [totalSkillsLearned, setTotalSkillsLearned] = useState(0);
  const [coursesMap, setCoursesMap] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const courseResponse = await fetch("http://localhost:5000/api/courses");
        const coursesData = await courseResponse.json();
        setTotalCourses(coursesData.length || 0); // Safely accessing length

        const coursesMapping = {};
        coursesData.forEach(course => {
          coursesMapping[course._id] = course.name;
        });
        setCoursesMap(coursesMapping);

        const marksResponse = await fetch("http://localhost:5000/api/marks");
        const marksData = await marksResponse.json();
        setMarksData(marksData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem("token");
        const employeeId = JSON.parse(localStorage.getItem("employee")).id;

        const response = await fetch(`http://localhost:5000/api/employeeSkillAssessment/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch assessments");
        }

        const data = await response.json();
        setAssessments(data || []); // Safely handling the data

        const counts = (data || []).reduce((acc, curr) => {
          const skill = curr.skills;
          if (skill) {
            acc[skill] = (acc[skill] || 0) + 1;
          }
          return acc;
        }, {});
        setSkillCounts(counts);

        // Calculate total skills learned by the employee
        const totalSkills = Object.keys(counts).length;
        setTotalSkillsLearned(totalSkills);

        const skillsResponse = await fetch("http://localhost:5000/api/skills");
        const skillsData = await skillsResponse.json();

        const skillsMapping = {};
        skillsData.forEach(skill => {
          skillsMapping[skill._id] = skill.name;
        });

        const skills = data.map((item) => skillsMapping[item.skills] || "Unknown"); // Handle undefined skills
        const marks = data.map((item) => item.marks || 0); // Handle undefined marks

        setMarksBarChartOptions({
          chart: {
            id: "marks-bar-chart",
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: skills,
            title: {
              text: "Skills",
              style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
              },
            },
          },
          yaxis: {
            title: {
              text: "Marks",
              style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
              },
            },
          },
        });

        setMarksBarChartSeries([
          {
            name: "Marks",
            data: marks,
          },
        ]);

        setMarksPieChartOptions({
          chart: {
            id: "marks-pie-chart",
            type: "pie",
            toolbar: {
              show: false,
            },
          },
          labels: skills,
          legend: {
            position: 'bottom',
          },
        });

        setMarksPieChartSeries(marks);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };

    fetchDashboardData();
    fetchAssessments();
  }, []);

  return (
    <div>
      <EmployeeNavbar />
      <div className="row">
        <EmployeeSidebar />
        <div className="container mt-4 col-md-9">
          <h2 className="mb-4">Employee Dashboard</h2>
          <p>Welcome to your dashboard! Track your performance and progress.</p>

          <div className="row mb-4">
            {/* Total Courses Card */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm h-100 border-primary">
                <div className="card-body text-center">
                  <h5 className="card-title text-primary">
                    <i className="fas fa-book-open"></i> Total Courses
                  </h5>
                  <p className="card-text display-4">{totalCourses}</p>
                </div>
              </div>
            </div>

            {/* Total Skills Learned Card */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm h-100 border-info">
                <div className="card-body text-center">
                  <h5 className="card-title text-info">Total Skills Learned</h5>
                  <p className="card-text display-4">{totalSkillsLearned}</p>
                </div>
              </div>
            </div>

            {/* Total Assessments Taken Card */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm h-100 border-success">
                <div className="card-body text-center">
                  <h5 className="card-title text-success">Total Assessments Taken</h5>
                  <p className="card-text display-4">{assessments.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            {/* Bar Chart for Skills and Marks */}
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body" style={{ padding: "1rem" }}>
                  <h5 className="card-title">Skills and Marks (Bar Chart)</h5>
                  <div style={{ width: "80%", margin: "0 auto" }}>
                    <Chart
                      options={marksBarChartOptions}
                      series={marksBarChartSeries}
                      type="bar"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Pie Chart for Marks Distribution */}
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body" style={{ padding: "1rem" }}>
                  <h5 className="card-title">Marks Distribution (Pie Chart)</h5>
                  <div style={{ width: "80%", margin: "0 auto" }}>
                    <Chart
                      options={marksPieChartOptions}
                      series={marksPieChartSeries}
                      type="pie"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

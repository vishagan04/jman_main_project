import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";
import Chart from "react-apexcharts";

const EmployeeDashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [assessments, setAssessments] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [marksBarChartOptions, setMarksBarChartOptions] = useState({});
  const [marksBarChartSeries, setMarksBarChartSeries] = useState([]);
  const [marksPieChartOptions, setMarksPieChartOptions] = useState({});
  const [marksPieChartSeries, setMarksPieChartSeries] = useState([]);
  const [skillCounts, setSkillCounts] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const courseResponse = await fetch("http://localhost:5000/api/courses");
        const coursesData = await courseResponse.json();
        setTotalCourses(coursesData.length);

        const completedResponse = await fetch("http://localhost:5000/api/completedCourses");
        const completedData = await completedResponse.json();
        setCompletedCourses(completedData.length);

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
        setAssessments(data);

        // Count the occurrences of each skill
        const counts = data.reduce((acc, curr) => {
          const skill = curr.skills;
          acc[skill] = (acc[skill] || 0) + 1; // Increment count for each skill
          return acc;
        }, {});
        setSkillCounts(counts);

        const skills = data.map((item) => item.skills);
        const marks = data.map((item) => item.marks);

        // Set up bar chart data
        setMarksBarChartOptions({
          chart: {
            id: "marks-bar-chart",
            toolbar: {
              show: false, // Hide the toolbar
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

        // Set up pie chart data
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
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <i className="fas fa-book-open"></i> Total Courses
                  </h5>
                  <p className="card-text display-4">{totalCourses}</p>
                </div>
              </div>
            </div>
            {/* Completed Courses Card */}
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <i className="fas fa-check-circle"></i> Completed Courses
                  </h5>
                  <p className="card-text display-4">{completedCourses}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            {/* Bar Chart for Skills and Marks */}
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Skills and Marks (Bar Chart)</h5>
                  <Chart
                    options={marksBarChartOptions}
                    series={marksBarChartSeries}
                    type="bar"
                    width="100%"
                  />
                </div>
              </div>
            </div>
            {/* Pie Chart for Marks Distribution */}
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Marks Distribution (Pie Chart)</h5>
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

          <div className="row">
            {/* Cards for Skill Counts */}
            {Object.entries(skillCounts).map(([skill, count]) => (
              <div className="col-lg-4 mb-4" key={skill}>
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">{skill}</h5>
                    <p className="card-text">Count: {count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

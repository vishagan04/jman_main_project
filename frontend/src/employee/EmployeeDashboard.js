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
        setTotalCourses(coursesData.length || 0);

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
        setAssessments(data || []);

        const counts = (data || []).reduce((acc, curr) => {
          const skill = curr.skills;
          if (skill) {
            acc[skill] = (acc[skill] || 0) + 1;
          }
          return acc;
        }, {});
        setSkillCounts(counts);

        const totalSkills = Object.keys(counts).length;
        setTotalSkillsLearned(totalSkills);

        const skillsResponse = await fetch("http://localhost:5000/api/skills");
        const skillsData = await skillsResponse.json();

        const skillsMapping = {};
        skillsData.forEach(skill => {
          skillsMapping[skill._id] = skill.name;
        });

        const skills = data.map((item) => skillsMapping[item.skills] || "Unknown");
        const marks = data.map((item) => item.marks || 0);

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
    <div className="employee-dashboard vh-100 ">
      <EmployeeNavbar />
      <div className="row m-0 w-100 min-vh-100 z-0" style={{
        // minHeight:"calc(100vh-7rem)",
        paddingTop:"95px"
      }}>
        <EmployeeSidebar />
        <div className="dashboard-content container mt-4 col-9 col-lg-10 z-0" style={{
          zIndex: 0
        }}>
          <h2 className="mb-4 text-primary">Employee Dashboard</h2>
          <p>Welcome to your dashboard! Track your performance and progress.</p>

          <div className="row mb-4">
            {/* Total Courses Card */}
            <div className="col-md-4">
              <div className="card shadow-sm border border-light bg-dark text-light p-4">
                <h4>Total Courses</h4>
                <p>{totalCourses}</p>
              </div>
            </div>
            {/* Total Skills Learned Card */}
            <div className="col-md-4">
              <div className="card shadow-sm border border-light bg-dark text-light p-4">
                <h4>Total Skills Learned</h4>
                <p>{totalSkillsLearned}</p>
              </div>
            </div>
            {/* Total Assessments Card */}
            <div className="col-md-4">
              <div className="card shadow-sm border border-light bg-dark text-light p-4">
                <h4>Total Assessments Taken</h4>
                <p>{assessments.length}</p>
              </div>
            </div>
          </div>

          {/* Bar and Pie Charts */}
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm bg-light p-4">
                <h4>Skill-wise Marks</h4>
                <div className="chart-container" style={{ height: "300px" }}>
                  <Chart
                    options={marksBarChartOptions}
                    series={marksBarChartSeries}
                    type="bar"
                    width="100%"
                    height="300px"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm bg-light p-4">
                <h4>Marks Distribution</h4>
                <div className="chart-container" style={{ height: "300px" }}>
                  <Chart
                    options={marksPieChartOptions}
                    series={marksPieChartSeries}
                    type="pie"
                    width="100%"
                    height="300px"
                  />
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

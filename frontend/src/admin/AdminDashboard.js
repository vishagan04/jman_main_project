import React, { useEffect, useState } from "react";
import Navbar from "../UI-components/Navbar";
import Sidebar from "../UI-components/Sidebar";
import Chart from "react-apexcharts";

const competencyLevelMapping = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

const AdminDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalSkills, setTotalSkills] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [competencyData, setCompetencyData] = useState({ categories: [], series: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total employees
        const employeeResponse = await fetch("http://localhost:5000/api/employees");
        const employeesData = await employeeResponse.json();
        setTotalEmployees(employeesData.length);

        // Fetch total skills
        const skillResponse = await fetch("http://localhost:5000/api/skills");
        const skillsData = await skillResponse.json();
        setTotalSkills(skillsData.length);

        // Fetch total courses
        const courseResponse = await fetch("http://localhost:5000/api/courses");
        const coursesData = await courseResponse.json();
        setTotalCourses(coursesData.length);

        // Fetch competency levels from courses
        const competencyLevels = coursesData.map(course => ({
          name: course.name,
          level: competencyLevelMapping[course.competencyLevel] || 0, // Map string to numeric value
        }));

        // Prepare data for the chart
        const categories = competencyLevels.map(item => item.name);
        const series = competencyLevels.map(item => item.level);

        setCompetencyData({
          categories,
          series: [{ name: "Competency Level", data: series }],
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="row">
        <Sidebar />
        <div className="container mt-4 col-md-9">
          <h1 className="mb-4">Admin Dashboard</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome to the Admin Dashboard!</h5>
              <p className="card-text">Manage employee skills, courses, and more.</p>
              <div className="row mt-4">
                {/* Total Employees Card */}
                <div className="col-lg-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="fas fa-users"></i> Total Employees
                      </h5>
                      <p className="card-text display-4">{totalEmployees}</p>
                    </div>
                  </div>
                </div>
                {/* Total Skills Card */}
                <div className="col-lg-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="fas fa-lightbulb"></i> Total Skills
                      </h5>
                      <p className="card-text display-4">{totalSkills}</p>
                    </div>
                  </div>
                </div>
                {/* Total Courses Card */}
                <div className="col-lg-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="fas fa-book"></i> Total Courses
                      </h5>
                      <p className="card-text display-4">{totalCourses}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ApexCharts Graph */}
              <div className="mt-4">
                <h5>Competency Level vs Courses</h5>
                <Chart
                  options={{
                    chart: {
                      type: "bar",
                    },
                    xaxis: {
                      categories: competencyData.categories,
                    },
                    title: {
                      text: "Competency Level vs Courses",
                      align: "center",
                    },
                    plotOptions: {
                      bar: {
                        horizontal: false,
                      },
                    },
                    yaxis: {
                      title: {
                        text: "Competency Level",
                      },
                    },
                  }}
                  series={competencyData.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

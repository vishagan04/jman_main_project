import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./components/EmployeeNavbar";
import EmployeeSidebar from "./components/EmployeeSidebar";
import Chart from "react-apexcharts";

const EmployeeDashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [skillProgress, setSkillProgress] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const courseResponse = await fetch("http://localhost:5000/api/courses");
        const coursesData = await courseResponse.json();
        setTotalCourses(coursesData.length);

        const completedResponse = await fetch("http://localhost:5000/api/completedCourses");
        const completedData = await completedResponse.json();
        setCompletedCourses(completedData.length);

        const progressResponse = await fetch("http://localhost:5000/api/skillProgress");
        const progressData = await progressResponse.json();
        setSkillProgress(progressData.progress); // Assuming progress is a number (e.g., 75)
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const coursesPieChartOptions = {
    labels: ["Completed Courses", "Remaining Courses"],
    series: [completedCourses, totalCourses - completedCourses],
    chart: {
      type: "pie",
    },
    legend: {
      position: 'bottom'
    },
  };

  const radialBarOptions = {
    series: [skillProgress],
    chart: {
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          value: {
            show: true,
            fontSize: '20px'
          }
        }
      }
    },
    labels: ["Skill Completion"],
  };

  return (
    <div>
      <EmployeeNavbar />
      <div className="row">
        <EmployeeSidebar />
        <div className="container mt-4 col-md-9">
          <h2>Employee Dashboard</h2>
          <p>Welcome to your dashboard! Here you can track your performance and progress.</p>
          <div className="row mt-4">
            {/* Total Courses Card */}
            <div className="col-lg-6">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-book-open"></i> Total Courses
                  </h5>
                  <p className="card-text">{totalCourses}</p>
                </div>
              </div>
            </div>
            {/* Pie Chart for Course Completion */}
            <div className="col-lg-6">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Course Completion Status</h5>
                  <Chart options={coursesPieChartOptions} series={coursesPieChartOptions.series} type="pie" width="100%" />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {/* Radial Bar Chart for Skill Completion */}
            <div className="col-lg-12">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Skill Completion Rate</h5>
                  <Chart options={radialBarOptions} series={radialBarOptions.series} type="radialBar" width="100%" />
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
